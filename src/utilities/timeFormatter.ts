const formatTime = (time: string) => {
  const timeArr = time.split(' ');
  const nums = timeArr[0].split(':');
  const dayPeriod = timeArr[1];
  if (dayPeriod === 'PM') {
    nums[0] = String(Number(nums[0]) + 12);
  }
  const formatedTime = nums.join(':');
  return formatedTime;
};

export default formatTime;
