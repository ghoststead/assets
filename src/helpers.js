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
    },

    humanFileSize(bytes, dp = 1) {
        const thresh = 1024;

        if (Math.abs(bytes) < thresh) {
            return `${bytes}`;
        }

        const units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
        let u = -1;
        const r = 10 ** dp;

        do {
            bytes /= thresh;
            ++u;
        } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

        return `${bytes.toFixed(dp)}${units[u]}`;
    }
}
;