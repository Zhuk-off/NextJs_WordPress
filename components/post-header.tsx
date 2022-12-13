import Avatar from './avatar';
import Date from './date';
import CoverImage from './cover-image';
import PostTitle from './post-title';
import Categories from './categories';

interface IPostHeader {
  title: string;
  coverImage: any;
  date: string;
  author?: any;
  categories?: any;
}

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}: IPostHeader) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-12 md:block">
        {author ? <Avatar author={author} /> : null}
      </div>
      {coverImage && (
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={title} coverImage={coverImage} />
        </div>
      )}
      {author && categories ? (
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 block md:hidden">
            <Avatar author={author} />
          </div>
          <div className="mb-6 text-lg">
            Posted <Date dateString={date} />
            <Categories categories={categories} />
          </div>
        </div>
      ) : null}
    </>
  );
}
