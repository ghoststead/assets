import helpers from '../src/helpers';

describe('helpers', () => {
    it('should test tokenizePath', () => {
        expect.hasAssertions();
        expect(helpers.tokenizePath('/')).toStrictEqual([]);
        expect(helpers.tokenizePath('/a//')).toStrictEqual(['a']);
    });

    it('should test parent', () => {
        expect.hasAssertions();
        expect(helpers.parent('/')).toStrictEqual('');
        expect(helpers.parent('/a')).toStrictEqual('');
        expect(helpers.parent('/a/')).toStrictEqual('');
        expect(helpers.parent('/a/b')).toStrictEqual('a');
        expect(helpers.parent('/a/b/')).toStrictEqual('a');
        expect(helpers.parent('/a/b/c')).toStrictEqual('a/b');
    });
    
    it('should test urlJoin', () => {
        expect.hasAssertions();
        expect(helpers.urlJoin('/', 'a')).toStrictEqual('/a');
        expect(helpers.urlJoin('/a', 'b')).toStrictEqual('/a/b');
        expect(helpers.urlJoin('/a/', 'b')).toStrictEqual('/a/b');
    });
});