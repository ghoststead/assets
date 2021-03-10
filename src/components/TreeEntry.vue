<template>
    <li
        class="list-group-item"
        :class="{active: active}"
    >
        <router-link
            :to="'/' + path"
            :class="{'text-white': active}"
        >
            {{ name }}
        </router-link>
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
</style>