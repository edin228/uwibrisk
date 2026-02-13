import ListedBlogCard from "../ListedBlogCard";

function RecentBlogColumn( {posts}) {
    return (
      <div className="flex flex-col w-full rounded-md px-2 bg-white rounded-md">
        <div className="flex w-full justify-center text-center items-center lg:justify-start uppercase tracking-widest font-semibold pl-2">
          Recent Blogs
        </div>
        <ul className="flex flex-col items-start gap-2">
          {posts.map((card) => (
            <ListedBlogCard
              key={card.id}
              post={card}
            />
          ))}
        </ul>
      </div>
    );
  }
  export default RecentBlogColumn;  