<template>
    <div>
        <h1 class="text-center mt-5 mb-1">
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
        <tree
            v-if="entries"
            :pathname="path"
            :entries="entries"
            :index="index"
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

</style>