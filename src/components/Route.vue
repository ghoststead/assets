<template>
    <div class="navbar-top bg-dark px-3 py-2">
        <div class="d-flex justify-content-between align-items-center">
            <a
                href="#"
                class="navbar-brand text-white fw-bold"
            >Ghoststead</a>
            <div class="ms-auto">
                <span class="px-2 rounded-pill bg-danger text-white d-inline-block fw-bold">v1.2.0</span>
            </div>
        </div>
    </div>
    <div class="left-area bg-light border-end">
        <tree
            v-if="entries"
            :pathname="path"
            :entries="entries"
            :index="index"
        />
    </div>
    <div class="right-area">
        <h1 class="border-bottom h3 pb-3 mb-3">
            /{{ path }}
        </h1>
        <breadcrumbs
            class="align-content-center"
            :path="path"
        />
        <div v-if="error">
            <p class="danger">
                {{ error }}
            </p>
        </div>
        <blob
            v-if="index >= 0"
            :entry="entries[index]"
        />
    </div>
</template>

<script>
import { computed } from 'vue';
import store from '@/store';

import Blob from '@/components/Blob';
import Breadcrumbs from '@/components/Breadcrumbs';
import Tree from '@/components/Tree';

export default {
    name: 'Route',
    components: {
        Tree,
        Blob,
        Breadcrumbs
    },
    setup() {
        return {
            error: computed(() => store.state.error),
            path: computed(() => store.state.path),
            entries: computed(() => store.state.entries),
            index: computed(() => store.state.index)
        };
    },
    created() {
        document.addEventListener('keyup', event => {
            if (event.code === 'ArrowRight') {
                store.dispatch('next');
            }
            if (event.code === 'ArrowLeft') {
                store.dispatch('previous');
            }
        });
    }
};
</script>

<style scoped>
    .navbar-top {
        flex: 0 0 100%;
        max-width: 100%;
    }
    .left-area {
        flex: 0 0 400px;
        max-width: 400px;
        min-height: calc(100vh - 56px);
        max-height: calc(100vh - 56px);
        overflow-y: auto;
    }
    .right-area {
        flex: 0 0 calc(100% - 400px);
        max-width: calc(100% - 400px);
        padding: 25px;
        min-height: calc(100vh - 56px);
        max-height: calc(100vh - 56px);
        overflow-y: auto;
    }
</style>