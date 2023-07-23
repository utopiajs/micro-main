// 基于 day.js 业务封装，入参形式统一为时间戳

import dayjs from 'dayjs';

function formateTime(
  timestamp: number,
  { template = 'YYYY-MM-DD HH:mm:ss' }: { template?: string } = {}
): string {
  return timestamp ? dayjs(timestamp).format(template) : '--';
}

export { formateTime };
