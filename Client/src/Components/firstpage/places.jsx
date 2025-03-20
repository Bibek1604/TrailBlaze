// import { cn } from "@/lib/utils";
// import Marquee from "@/components/magicui/marquee";
// import PropTypes from 'prop-types';
// import pokhara from "@/public/pokhara.jpg";
// import pokhara1 from "@/public/pokhara1.jpg";
// import ktm from "@/public/kathmandu.jpg";
// import ktm1 from "@/public/kathmandu1.jpg";
// import manang from "@/public/manang.jpg";
// import manangtour from "@/public/manang1.jpg";
// import mustang from "@/public/mustang.jpg";
// import mustangtour from "@/public/mustang1.jpg";

// const reviews = [
//   {
//     name: "pokhara",
//     username: "_imbibek",
//     body: "I've never seen anything like this before. It's amazing. I love it.",
//     img: {pokhara},
//   },
//   {
//     name: "pokhara",
//     username: "_imbibek",
//     body: "I've never seen anything like this before. It's amazing. I love it.",
//     img: {pokhara1},
//   },
//   {
//     name: "Kathmandu",
//     username: "_imbibek",
//     body: "I don't know what to say. I'm speechless. This is amazing.",
//     img: {ktm},
//   },
//   {
//     name: "kathmandu",
//     username: "_imbibek",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: {ktm1},
//   },
//   {
//     name: "manang",
//     username: "_imbibek",
//     body: "Heaven",
//     img: {manang},
//   },
//   {
//     name: "manang",
//     username: "_imbibek",
//     body: "Heaven",
//     img: {manangtour},
//   },
//   {
//     name: "mustang",
//     username: "_imbibek",
//     body: "I don't know what to say. I'm speechless with this landscape.",
//     img: {mustang},
//   },
//   {
//     name: "mustang",
//     username: "_imbibek",
//     body: "I don't know what to say. I'm speechless with this landscape.",
//     img: {mustangtour},
//   },
// ];

// const firstRow = reviews.slice(0, reviews.length / 2);
// const secondRow = reviews.slice(reviews.length / 2);

// export const Place = ({
//   img,
//   name,
//   username,
//   body,
// }) => {
//   return (
//     <figure
//       className={cn(
//         "relative h-40 w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
//         // light styles
//         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
//         // dark styles
//         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
//       )}
//     >
//       <div className="flex flex-row items-center gap-2">
//         <img className="rounded-full" width="32" height="32" alt="" src={img} />
//         <div className="flex flex-col">
//           <figcaption className="text-sm font-medium dark:text-white">
//             {name}
//           </figcaption>
//           <p className="text-xs font-medium dark:text-white/40">{username}</p>
//         </div>
//       </div>
//       <blockquote className="mt-2 text-sm">{body}</blockquote>
//     </figure>
//   );
// };
// Place.propTypes = {
//   img: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   username: PropTypes.string.isRequired,
//   body: PropTypes.string.isRequired,
// };

// export function MarqueeDemoVertical() {
//   return (
//     <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
//       <Marquee pauseOnHover vertical className="[--duration:20s]">
//         {firstRow.map((review) => (
//           <ReviewCard key={review.username} {...review} />
//         ))}
//       </Marquee>
//       <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
//         {secondRow.map((review) => (
//           <ReviewCard key={review.username} {...review} />
//         ))}
//       </Marquee>
//       <div className="absolute inset-x-0 top-0 pointer-events-none h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
//       <div className="absolute inset-x-0 bottom-0 pointer-events-none h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
//     </div>
//   );
// }
// // eslint-disable-next-line react/prop-types
// const ReviewCard = ({ img, name, username, body }) => {
//     return (
//         <div className="p-4">
//             <Place img={img} name={name} username={username} body={body} />
//         </div>
//     );
// };