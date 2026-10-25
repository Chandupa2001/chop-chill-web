import photos from '../config/photos.json';

// ImageSlot props for a photo in /public/images, using the web-sized versions
// made by `npm run photos`. A photo that hasn't been processed yet shows a
// placeholder labelled with its file name.
export function photoProps(file) {
  const photo = photos[file];
  if (!photo) return { label: file };
  return {
    src: photo.srcSet[0].src,
    srcSet: photo.srcSet.map((s) => `${s.src} ${s.w}w`).join(', '),
    width: photo.width,
    height: photo.height,
  };
}
