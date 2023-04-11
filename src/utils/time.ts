import dayjs from "dayjs";

/**
 *@description 경과 시간 표시, baseTime이 updateTime보다 더 과거여야함
 *@param baseTime - 기준 시간 (변하지 않는 시간)
 *@param updateTime - 변하는/수정된 시간 (변하지 않는 시간)
 */
export function getProgressTime(baseTime?: string, updateTime?: string) {
  if (!baseTime) return "방금 전";

  const updateTimestamp = updateTime ? dayjs(updateTime) : dayjs();
  const baseTimestamp = dayjs(baseTime);

  const diffYears = updateTimestamp.diff(baseTimestamp, "year");
  if (diffYears > 0) return `${diffYears}년 전`;

  const diffMonths = updateTimestamp.diff(baseTimestamp, "month");
  if (diffMonths > 0) return `${diffMonths}달 전`;

  const diffDays = updateTimestamp.diff(baseTimestamp, "day");
  if (diffDays > 0) return `${diffDays}일 전`;

  const diffHours = updateTimestamp.diff(baseTimestamp, "h");
  if (diffHours > 0) return `${diffHours}시간 전`;

  const diffMinutes = updateTimestamp.diff(baseTimestamp, "m");
  if (diffMinutes > 0) return `${diffMinutes}분 전`;

  return `방금 전`;
}
