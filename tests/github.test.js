import {Octokit} from '@octokit/rest';
const octokit = new Octokit({
    auth: process.env.VUE_APP_GITHUB_TOKEN
});

describe('github', () => {
    it('should check configuration', () => {
        expect.assertions(3);
        expect(process.env.VUE_APP_GITHUB_REPO_OWNER).toBeTruthy();
        expect(process.env.VUE_APP_GITHUB_REPO_NAME).toBeTruthy();
        expect(process.env.VUE_APP_GITHUB_TOKEN).toBeTruthy();
    });

    it('should list files', async () => {
        expect.assertions(2);
        const res = await octokit.repos.getContent({
            owner: process.env.VUE_APP_GITHUB_REPO_OWNER,
            repo: process.env.VUE_APP_GITHUB_REPO_NAME,
            path: '',
            ref: 'master'
        });
        expect(res.data).toBeTruthy();
        expect(res.headers['content-type'].split(';')[0]).toStrictEqual('application/json');
    });

    it('should get file', async () => {
        expect.assertions(2);
        let res = await octokit.repos.getContent({
            owner: process.env.VUE_APP_GITHUB_REPO_OWNER,
            repo: process.env.VUE_APP_GITHUB_REPO_NAME,
            path: '.gitignore',
            ref: 'master'
        });
        expect(res.data.type).toStrictEqual('file');

        res = await octokit.git.getBlob({
            owner: process.env.VUE_APP_GITHUB_REPO_OWNER,
            repo: process.env.VUE_APP_GITHUB_REPO_NAME,
            file_sha: res.data.sha
        });
        expect(res.status).toStrictEqual(200);
    });
});
