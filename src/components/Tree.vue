<template>
    <div @keyup="keyup(key)">
        <ul class="list-group list-group-borderless">
            <tree-entry
                v-for="(entry, i) in entries"
                :key="entry.name"
                :name="entry.name"
                :type="entry.type"
                :size="entry.size"
                :path="entry.path"
                :active="i === index"
            />
        </ul>
    </div>
</template>

<script>
import TreeEntry from '@/components/TreeEntry';

export default {
    name: 'Tree',
    components: {TreeEntry},
    props: {
        pathname: {
            type: String,
            required: true
        },
        entries: {
            type: Array,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        keyup(key) {
            console.log(key);
        }
    }
};

</script>

<style scoped>
</style>