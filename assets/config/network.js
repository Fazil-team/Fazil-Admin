const env = 'prod'
const SERVER_IP = 'https://pan.mrcsh.cn'
const DEVELOP_IP = '110.42.67.157:8891'
export const baseURL = env === 'dev'?`http://${DEVELOP_IP}`:SERVER_IP
export const wsURL = env === 'dev'?`ws://${DEVELOP_IP}`:SERVER_IP;
