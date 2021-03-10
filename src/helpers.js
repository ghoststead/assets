export default {
    tokenizePath(pathname) {
        if (!pathname) {
            return [];
        }
        return pathname.split('/').filter((token) => {
            return token !== '';
        });
    },

    parent(pathname) {
        if (!pathname || pathname === '') {
            return null;
        }
        const tokens = this.tokenizePath(pathname);

        if (tokens.length < 2) {
            return '';
        }
        tokens.pop();
        return tokens.join('/');
    },

    urlJoin(pathname, name) {
        if (!pathname) {
            return `/${name}`;
        }
        if (pathname.endsWith('/')) {
            return pathname + name;
        }
        return `${pathname}/${name}`;
    }
};