import webpack from 'webpack';
import webpackDevServer from './webpack/devServer';
import webpackLoaders from './webpack/loaders';
import webpackPlugins from './webpack/plugins';
import webpackResolve from './webpack/resolve';
import { IWebpackBuildOptions } from './webpack/types/types';

export const webpackBuildConfig = (options: IWebpackBuildOptions): webpack.Configuration => {
    const { mode, paths } = options;
    const isDeevelopment: boolean = mode === 'development';

    return {
        mode: mode ?? 'development',

        entry: paths.entry,

        output: {
            filename: '[name].js',
            path: paths.output,
        },
    
        plugins: webpackPlugins(options),

        resolve: webpackResolve(options),

        module: {
            rules: webpackLoaders(options),
        },

        devServer: isDeevelopment ? webpackDevServer(options) : undefined,
        devtool: isDeevelopment && 'inline-source-map',
    }
}
