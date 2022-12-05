import Img, { ImageProps } from 'next/image';
import cx from 'classnames';
import { DEFAULT_IMG_URL } from '../lib/constants';

/**
 * Image Component.
 * We don't need to add srcSet, as Next js will generate that.
 * @see https://nextjs.org/docs/api-reference/next/image#other-props
 * @see https://nextjs.org/docs/basic-features/image-optimization#device-sizes
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */


interface Props extends ImageProps {
  title?: string;
  className?: string;
  layout?: string;
  objectFit?: string;
  containerClassNames?: string;
  showdefault?: boolean;
}

const ImageMod = (props: Props) => {
  const {
    alt,
    title,
    width,
    height,
    src,
    className,
    layout,
    objectFit,
    containerClassNames,
    showdefault,
    ...rest
  } = props;

  if (!src && !showdefault) {
    return null;
  }

  /**
   * If we use layout = fill then, width and height of the image cannot be used.
   * and the image fills on the entire width and the height of its parent container.
   * That's we need to wrap our image in a container and give it a height and width.
   * Notice that in this case, the given height and width is being used for container and not img.
   */

  if ('fill' === layout) {
    const attributes = {
      alt: alt || title,
      src: src || (showdefault ? DEFAULT_IMG_URL : ''),
      layout: 'fill',
      showdefault: true.toString(),
      className: cx('object-cover', 'product__image', className),
      ...rest,
    };
    return (
      <div className={cx('relative', containerClassNames)}>
        <Img {...attributes} />
      </div>
    );
  } else {
    const attributes = {
      alt: alt || title,
      src: src || (showdefault ? DEFAULT_IMG_URL : ''),
      width: width,
      height: height,
      showdefault: true.toString(),
      className: cx('product__image', className),
      ...rest,
    };
    return <Img {...attributes} />;
  }
};

export default ImageMod;
