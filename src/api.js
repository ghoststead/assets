import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
    auth: process.env.VUE_APP_GITHUB_TOKEN
});

export default {

    getContent({path, ref}) {
        return octokit.repos.getContent({
            owner: process.env.VUE_APP_GITHUB_REPO_OWNER,
            repo: process.env.VUE_APP_GITHUB_REPO_NAME,
            path,
            ref,
        });
    },

    getEntries({path, ref}) {
        return octokit.repos.getContent({
            owner: process.env.VUE_APP_GITHUB_REPO_OWNER,
            repo: process.env.VUE_APP_GITHUB_REPO_NAME,
            path,
            ref,
        }).then((res) => {
            return res.data;
        });
    },

    getBlob({sha}) {
        return octokit.git.getBlob({
            owner: process.env.VUE_APP_GITHUB_REPO_OWNER,
            repo: process.env.VUE_APP_GITHUB_REPO_NAME,
            file_sha: sha
        }).then((res) => {
            return Buffer.from(res.data.content, 'base64');
        });
    }
};
