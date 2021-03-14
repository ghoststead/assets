<template>
    <li
        class="list-group-item"
        :class="{active: active}"
    >
        <img
            :src="img"
            :alt="type"
        >
        <router-link
            :to="'/' + path"
            :class="{'text-white': active}"
        >
            {{ name }}
        </router-link>
        <p class="my-0 ms-auto">
            <span>{{ displaySize }}</span>
        </p>
    </li>
</template>

<script>

import FolderIcon from '@/assets/folder.svg';
import FileIcon from '@/assets/file.svg';

import helpers from '@/helpers';

export default {
    name: 'DirectoryEntry',
    props: {
        path: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        }
    },
    computed: {
        img() {
            if (this.type === 'file') {
                return FileIcon;
            } else if (this.type === 'dir') {
                return FolderIcon;
            }
            return null;
        },
        displaySize() {
            if (this.type === 'file') {
                return helpers.humanFileSize(this.size);
            }
            return '';
        }
    }
};
</script>

<style scoped>
li {
    cursor: pointer;
}

.list-group-item {
    border: none;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-wrap: wrap;
    padding: 12px 15px;
    position: relative;
}

.list-group-item:hover:not(.active) {
    background: #fff;
}

.list-group-item:not(.active) {
    background: transparent;
}

.active svg path {
    fill: #fff;
}

svg {
    width: 20px;
}

svg path {
    fill: #ffb703;
}

a {
    color: #222;
    padding-left: 7px;
    flex: 0 0 calc(100% - 100px);
    max-width: calc(100% - 100px);
}

a:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

span {
    font-size: 12px;
    color: #000;
    padding: 2px 8px;
}

.active span {
    color: #fff;
}
</style>