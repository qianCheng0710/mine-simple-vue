import { login, postform, get, getBlob, post } from './axios/helper';
import Cookie from 'js-cookie';

export const userLogin = postform('/oauth/token');

export const userAccount = login('/api/account');

//获取工程图集
export const getAtlas = get(`api/atlas`); //101001 施工记录 101002 工程质量 101003 工程安全

//获取视频监控列表
export const getVideoResource = get(`api/videoTest/getResource`);

//获取碾压质量
export const getRollOverQuality = get(`api/fileInfoes`);

//获取blob数据（工程图集图片信息，碾压质量pdf预览）
export const getfileInfo = (param)=> getBlob(`api/fileInfoes/getFile/${param}?access_token=${localStorage.getItem('access_token')}`)();

//获取blob数据（工程图集图片信息，碾压质量pdf预览）
export const getstatisticsData = get(`api/statisticsData/constructionSite/newData?access_token=${localStorage.getItem('access_token')}`);

/**
 * 添加图集
 */
export const createManager = post(`api/atlas`);














