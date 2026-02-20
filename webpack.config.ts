import path from 'path';
import webpack from 'webpack';
import { webpackBuildConfig } from './config/webpackBuildConfig';

type TMode = 'production' | 'development';

interface IEnvVariable {
    mode?: TMode;
    port?: number;
    restData?: 'real' | 'mock'
}

export default (env: IEnvVariable) => {

    const config: webpack.Configuration = webpackBuildConfig({
        port: env.port ?? 9090,
        paths: {
            entry: {
                main: {
                    import: path.resolve(__dirname, 'src', 'index.tsx'),
                    filename: '[name].[contenthash:8].js',
                },
            },
            html: path.resolve(__dirname, 'src', 'index.html'),
            output: path.resolve(__dirname, 'public'),
            src: path.resolve(__dirname, 'src'),
        },
        mode: env.mode ?? 'development',
    })

    return config;
}
