/**
 * 이미지 + 최소 로딩 시간 보장
 */
export const loadData = async () => {
  const MIN_TIME = 300;

  const delay = new Promise((res) => setTimeout(res, MIN_TIME));

  const images = [...document.images];

  const preload = Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((res) => {
            img.onload = img.onerror = res;
          }),
    ),
  );

  await Promise.all([delay, preload]);
};
