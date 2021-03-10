<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li
                v-for="crumb in crumbs"
                :key="crumb.name"
                :aria-current="crumb.active ? 'page' : false"
                :class="{active: crumb.active}"
                class="breadcrumb-item"
            >
                <router-link
                    v-if="!crumb.active"
                    :to="crumb.path"
                >
                    {{ crumb.name }}
                </router-link>
                <span v-else>{{ crumb.name }}</span>
            </li>
        </ol>
    </nav>
</template>

<script>
import helpers from '@/helpers';

export default {
    name: 'Breadcrumbs',
    props: {
        path: {
            type: String,
            required: true
        }
    },
    computed: {
        crumbs() {
            let path = '/';
            const crumbs = [{
                name: 'Home',
                path: '/',
                active: false
            }].concat(helpers.tokenizePath(this.path).map((token) => {
                path = helpers.urlJoin(path, token);
                return {
                    name: token,
                    path: path,
                    active: false
                };
            }));
            crumbs[crumbs.length - 1].active = true;
            return crumbs;
        }
    }
};
</script>

<style scoped>

</style>