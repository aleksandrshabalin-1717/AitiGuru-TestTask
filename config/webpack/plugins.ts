import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { IWebpackBuildOptions } from './types/types';

const webpackPlugins = ({ mode, paths}: IWebpackBuildOptions): Configuration['plugins'] => {
    const isDeevelopment: boolean = mode === 'development';
    const isProduction: boolean = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
    ]

    if (isDeevelopment) {
        // Не рекомендуют использовать в проде, так как может сильно замедлять сборку
        plugins.push(new webpack.ProgressPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isProduction) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
    }

    return plugins;
}

export default webpackPlugins;
