const isDev = () => {
console.log(process.env)
  return process.env.NODE_ENV?.trim() !== 'production';
}

export { isDev };
