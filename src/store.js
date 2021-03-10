import {createStore} from 'vuex';
import api from '@/api';
import helpers from '@/helpers';

async function handleFile({commit}, path) {
    try {
        const parentPath = helpers.parent(path);
        const entries = await api.getEntries({
            path: parentPath
        });

        let index = -1;
        for (let i = 0; i < entries.length; i++) {
            if (path === entries[i].path) {
                index = i;
                break;
            }
        }
        commit('setPath', path);
        commit('setEntries', entries);
        commit('setIndex', index);
        return path;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default createStore({
    state: {
        error: null,

        path: null,
        entries: [],
        index: -1
    },
    mutations: {
        setError: (state, error) => state.error = error,
        clearError: (state) => state.error = null,

        setPath: (state, path) => state.path = path,
        setEntries: (state, entries) => state.entries = entries,
        setIndex: (state, index) => state.index = index
    },
    actions: {
        async load({commit, state}, path) {
            commit('clearError');
            if (state.path === path) {
                // Don't reload if path hasn't changed
                return path;
            }
            try {
                const res = await api.getContent({
                    path: path
                });
                if (res.data.type === 'file') {
                    return handleFile({commit}, path);
                } else {
                    let index = -1;
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].type === 'file') {
                            index = i;
                            break;
                        }
                    }
                    commit('setPath', path);
                    commit('setEntries', res.data);
                    commit('setIndex', index);
                    if (index !== -1) {
                        return res.data[index].path;
                    }
                    return path;
                }
            } catch (error) {
                if (error.errors && error.errors.length === 1) {
                    if (error.errors[0].code === 'too_large') {
                        return handleFile({commit}, path);
                    }
                }
                commit('setError', error.message);
                return Promise.reject(error);
            }
        },
        next({commit, state}) {
            let index = state.index + 1;
            while (index < state.entries.length) {
                const entry = state.entries[index];
                if (entry.type === 'file') {
                    commit('setIndex', index);
                    return;
                }
                index++;
            }
        },
        previous({commit, state}) {
            let index = state.index - 1;

            while (index >= 0) {
                const entry = state.entries[index];
                if (entry.type === 'file') {
                    commit('setIndex', index);
                    return;
                }
                index--;
            }
        }
    }
});