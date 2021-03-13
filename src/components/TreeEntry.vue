<template>
    <li
        class="list-group-item"
        :class="{active: active}"
    >   

        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Stockholm-icons-/-Files-/-Folder-solid" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                <path d="M3.5,21 L20.5,21 C21.3284271,21 22,20.3284271 22,19.5 L22,8.5 C22,7.67157288 21.3284271,7 20.5,7 L10,7 L7.43933983,4.43933983 C7.15803526,4.15803526 6.77650439,4 6.37867966,4 L3.5,4 C2.67157288,4 2,4.67157288 2,5.5 L2,19.5 C2,20.3284271 2.67157288,21 3.5,21 Z" id="Combined-Shape" fill="#000000"></path>
            </g>
        </svg>
        <router-link
            :to="'/' + path"
            :class="{'text-white': active}"
        >
            {{ name }}
        </router-link>
        <p>
            <span>85788(B)</span>
        </p>
    </li>
</template>

<script>

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
    }
    a:after {
        content:"";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    p {
        margin: 0;
        margin-left: auto;
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