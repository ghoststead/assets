import mime from 'mime';

const typeMap = {
    'text/plain': ['gitignore', 'CNAME']
};

mime.define(typeMap);
export default mime;