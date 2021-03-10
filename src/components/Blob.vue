<template>
    <!-- eslint-disable vue/no-v-html -->
    <div>
        <a
            v-if="content"
            :href="'data:'+mimeType+';base64, ' + content.toString('base64')"
            :download="entry.name"
        >Download</a>
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
        <div v-if="info">
            <dl class="row">
                <dt class="col-6 text-end">
                    Mime-Type
                </dt>
                <dd class="col-6">
                    {{ mimeType || 'application/octet-stream' }}
                </dd>
                <dt class="col-6 text-end">
                    Size (bytes)
                </dt>
                <dd class="col-6">
                    {{ entry.size }}
                </dd>
                <template
                    v-for="(value, key) in info"
                    :key="key"
                >
                    <dt class="col-6 text-end">
                        {{ key }}
                    </dt>
                    <dd class="col-6">
                        {{ value }}
                    </dd>
                </template>
            </dl>
        </div>
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
.d-flex {
    min-height: 300px;
}

img {
    max-width: 100%;
}
</style>