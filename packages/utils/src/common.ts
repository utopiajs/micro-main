const isDev = () => process.env.NODE_ENV?.trim() !== 'production';

export { isDev };
