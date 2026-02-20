import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { IWebpackBuildOptions } from './types/types';

const webpackDevServer = ({ port, paths}: IWebpackBuildOptions): DevServerConfiguration => {
    return {
        static: paths.output,
        port: port ?? 8080,
        open: true,
        historyApiFallback: true,
        hot: true,
        compress: true,
    }
}

export default webpackDevServer;
