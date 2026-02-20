import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { IWebpackBuildOptions } from './types/types';

const webpackLoaders = (options: IWebpackBuildOptions): ModuleOptions['rules'] => {
    const isDeevelopment: boolean = options.mode === 'development';

    const cssLoader = {
        // test: /\.(css)$/,
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
            isDeevelopment
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            // 'style-loader',
            'css-loader',
            'sass-loader'
        ]
    };

    const babelLoader = {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    };

    const fontLoader = {
        test: /\.(ttf|otf|eot|svg|woff|woff2)$/,
        type: 'asset/resource',
        exclude: /node_modules/,
    };

    return [
        cssLoader,
        fontLoader,
        babelLoader,
    ];
}

export default webpackLoaders;
