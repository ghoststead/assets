<template>
    <!-- eslint-disable vue/no-v-html -->
    <div>
        
        <div class="text-center my-3 bg-light d-flex flex-column justify-content-center">
            <div
                v-if="error"
                class="text-danger"
            >
                {{ error }}
            </div>
            <div v-if="content">
                <img
                    v-if="mimeType.startsWith('image/')"
                    :alt="entry.path"
                    :src="'data:'+mimeType+';base64, ' + content.toString('base64')"
                    @load="onImageLoad"
                >
                <div v-else-if="mimeType === 'text/plain'">
                    <pre>{{ content.toString().substring(0, 1024) }}</pre>
                </div>
                <div v-else>
                    <pre>File cannot be displayed.</pre>
                </div>
            </div>
        </div>
        <div
            v-if="info"
            class="border border-bottom-0 info"
        >
            <dl class="row g-0 m-0">
                <dt class="col-6 px-3 py-2 border-bottom m-0">
                    Mime-Type
                </dt>
                <dd class="col-6 px-3 py-2 border-bottom m-0">
                    {{ mimeType || 'application/octet-stream' }}
                </dd>
                <dt class="col-6 px-3 py-2 border-bottom m-0">
                    Size (bytes)
                </dt>
                <dd class="col-6 px-3 py-2 border-bottom m-0">
                    {{ entry.size }}
                </dd>
                <template
                    v-for="(value, key) in info"
                    :key="key"
                >
                    <dt class="col-6 px-3 py-2 border-bottom m-0">
                        {{ key }}
                    </dt>
                    <dd class="col-6 px-3 py-2 border-bottom m-0">
                        {{ value }}
                    </dd>
                </template>
            </dl>
        </div>
        <a
            class="btn btn-primary mt-3"
            v-if="content"
            :href="'data:'+mimeType+';base64, ' + content.toString('base64')"
            :download="entry.name"
        >Download</a>
    </div>
</template>

<script>
import mime from '@/mime';
import api from '@/api';

export default {
    name: 'Blob',
    props: {
        entry: {
            type: Object,
            required: true
        },
    },
    data: function () {
        return {
            content: null,
            error: null,
            info: null,
        };
    },
    computed: {
        mimeType() {
            return mime.getType(this.entry.path);
        }
    },
    watch: {
        entry(newEntry) {
            this.load(newEntry.sha);
        }
    },
    created() {
        this.load(this.entry.sha);
    },
    methods: {
        load(sha) {
            this.content = null;
            this.info = {};

            api.getBlob({
                sha: sha
            }).then((content) => {
                this.content = content;
                this.error = null;
            }).catch((error) => {
                this.error = error.message;
            });
        },
        onImageLoad(event) {
            this.info['Dimensions (px)'] = `${event.target.width}x${event.target.height}`;
        }
    }
};
</script>

<style scoped>
    .info {
        max-width: 420px;
    }
    .d-flex {
        min-height: 300px;
    }

    img {
        max-width: 100%;
    }
</style>