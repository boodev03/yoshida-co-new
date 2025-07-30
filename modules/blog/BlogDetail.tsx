"use client";

import { ChevronRight } from "@/components/icons/ChevronRight";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const images = [
  { src: "/images/capability-2.png", alt: "blog-detail-1" },
  { src: "/images/capability-2.png", alt: "blog-detail-2" },
  { src: "/images/capability-2.png", alt: "blog-detail-3" },
  { src: "/images/capability-2.png", alt: "blog-detail-4" },
  { src: "/images/capability-2.png", alt: "blog-detail-5" },
];

interface BlogDetailProps {
  blogId: string;
}

export default function BlogDetail({ blogId }: BlogDetailProps) {
  const router = useRouter();
  const onBack = () => {
    router.back();
  };
  return null;
  //   return (
  //     <section className="pt-[82px] mlg:pt-[90px]">
  //       <div className="container mx-auto">
  //         <div className="hidden md:block mb-[120px] mt-4">
  //           <div className="flex items-center gap-2 text-web-main">
  //             <p className="text-normal text-sm text-web-dark font-normal">Top</p>
  //             <ChevronRight />
  //             <p className="text-normal text-sm text-web-dark font-normal">
  //               新着記事
  //             </p>
  //             <ChevronRight />
  //             <p className="text-normal text-sm text-web-dark font-normal">
  //               廃炉向け鉛遮へい付グローブボックス
  //             </p>
  //           </div>
  //         </div>
  //         <div className="space-y-4 md:space-y-6 border-b border-line-gray pb-4 md:pb-16">
  //           <h2 className="text-jp-h2">廃炉向け鉛遮へい付グローブボックス</h2>
  //           <div className="flex items-center justify-between">
  //             <h4 className="text-jp-p3 text-web-main font-bold">2023年6月6日</h4>
  //             <Button
  //               variant="outline"
  //               className="py-2 w-[96px] text-[13px] mlg:text-[14px] h-[26px] leading-[1.625] tracking-[0.02em]"
  //             >
  //               お知らせ
  //             </Button>
  //           </div>
  //         </div>

  //         <div className="mt-12 md:mt-20 flex flex-col md:flex-row md:items-center gap-8">
  //           <div className="aspect-video relative md:w-1/2">
  //             <Image src="/images/capability-2.png" alt="blog-detail-1" fill />
  //           </div>
  //           <p className="text-jp-p2 text-web-dark font-normal whitespace-pre-wrap md:w-1/2">
  //             {`廃炉向け鉛遮へい付グローブボックス、分析用グローブボックスの設計、製作、据付工事を行いました。
  // このグローブボックス特徴は、高線量サンプルを取扱う際は、鉛遮へいを閉じて、マニピュレーターによる操作を行います。
  // 一方、低線量サンプルを扱う際は、鉛遮へいを開放し、グローブ操作が可能な構造となっています。
  // また、今回、新たな取り組みとして、内部目視用の鉛ガラスの代わりに、複数台のカメラを設置することで、グローブボックスの内部の全面モニタリングを可能としました。
  // （特許取得：特許6850464「遮蔽グローブボックス」）
  // 内部機構は、マニピュレーターと汎用ロボットの共用により、作業工程の時間の短縮化を図っています。
  // なお、鉛遮へい付グローブボックス内で希釈されたサンプルは、ダブルドアシステムを用いて、分析用のグローブボックスへと展開されます。`}
  //           </p>
  //         </div>

  //         {/* Images section */}
  //         <div className="mt-8 md:mt-16">
  //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  //             {images.map((image, index) => (
  //               <div key={index} className="aspect-video relative">
  //                 <Image src={image.src} alt={image.alt} fill />
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         <div>
  //           <div className="relative aspect-video md:mx-[96px] my-8 md:my-16">
  //             <Image src="/images/capability-2.png" alt="blog-detail-1" fill />
  //           </div>
  //           <p className="text-jp-p2 text-web-dark font-normal whitespace-pre-wrap">
  //             {`廃炉向け鉛遮へい付グローブボックス、分析用グローブボックスの設計、製作、据付工事を行いました。
  // このグローブボックス特徴は、高線量サンプルを取扱う際は、鉛遮へいを閉じて、マニピュレーターによる操作を行います。
  // 一方、低線量サンプルを扱う際は、鉛遮へいを開放し、グローブ操作が可能な構造となっています。
  // また、今回、新たな取り組みとして、内部目視用の鉛ガラスの代わりに、複数台のカメラを設置することで、グローブボックスの内部の全面モニタリングを可能としました。
  // （特許取得：特許6850464「遮蔽グローブボックス」）
  // 内部機構は、マニピュレーターと汎用ロボットの共用により、作業工程の時間の短縮化を図っています。
  // なお、鉛遮へい付グローブボックス内で希釈されたサンプルは、ダブルドアシステムを用いて、分析用のグローブボックスへと展開されます。`}
  //           </p>
  //         </div>

  //         {/* Video section */}
  //         <div className="my-8 md:my-16">
  //           <div className="relative aspect-video md:mx-[96px]">
  //             <iframe
  //               src="https://www.youtube.com/embed/5ikZdwgVPNo?si=97vmD4QB-obQ7Vx0"
  //               title="YouTube video player"
  //               frameBorder="0"
  //               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //               allowFullScreen
  //               className="size-full object-cover"
  //             />
  //           </div>
  //         </div>

  //         {/* Title 1 */}
  //         <div className="space-y-4 md:space-y-8 my-8 md:my-16">
  //           <h2 className="text-jp-h2 text-web-dark">タイトル1</h2>
  //           <p className="text-jp-p2 font-normal text-web-dark whitespace-pre-wrap">{`廃炉向け鉛遮へい付グローブボックス、分析用グローブボックスの設計、製作、据付工事を行いました。
  // このグローブボックス特徴は、高線量サンプルを取扱う際は、鉛遮へいを閉じて、マニピュレーターによる操作を行います。
  // 一方、低線量サンプルを扱う際は、鉛遮へいを開放し、グローブ操作が可能な構造となっています。
  // また、今回、新たな取り組みとして、内部目視用の鉛ガラスの代わりに、複数台のカメラを設置することで、グローブボックスの内部の全面モニタリングを可能としました。
  // （特許取得：特許6850464「遮蔽グローブボックス」）
  // 内部機構は、マニピュレーターと汎用ロボットの共用により、作業工程の時間の短縮化を図っています。
  // なお、鉛遮へい付グローブボックス内で希釈されたサンプルは、ダブルドアシステムを用いて、分析用のグローブボックスへと展開されます。`}</p>
  //         </div>

  //         {/* Title 2 */}
  //         <div className="flex flex-col md:flex-row md:items-center gap-8">
  //           <div className="space-y-4 md:space-y-6 flex-1">
  //             <h3 className="text-jp-h3 font-bold text-web-dark">タイトル2</h3>
  //             <p className="text-jp-p2 font-normal text-web-dark whitespace-pre-wrap">{`廃炉向け鉛遮へい付グローブボックス、分析用グローブボックスの設計、製作、据付工事を行いました。
  // このグローブボックス特徴は、高線量サンプルを取扱う際は、鉛遮へいを閉じて、マニピュレーターによる操作を行います。
  // 一方、低線量サンプルを扱う際は、鉛遮へいを開放し、グローブ操作が可能な構造となっています。
  // また、今回、新たな取り組みとして、内部目視用の鉛ガラスの代わりに、複数台のカメラを設置することで、グローブボックスの内部の全面モニタリングを可能としました。
  // （特許取得：特許6850464「遮蔽グローブボックス」）
  // 内部機構は、マニピュレーターと汎用ロボットの共用により、作業工程の時間の短縮化を図っています。
  // なお、鉛遮へい付グローブボックス内で希釈されたサンプルは、ダブルドアシステムを用いて、分析用のグローブボックスへと展開されます。`}</p>
  //           </div>

  //           <div className="space-y-2 flex-1">
  //             <div className="aspect-video relative">
  //               <Image src="/images/capability-2.png" alt="blog-detail-1" fill />
  //             </div>
  //             <p className="text-jp-p2 text-web-dark font-normal">画像の説明文</p>
  //           </div>
  //         </div>

  //         <div className="my-16 hidden md:block border-b border-line-gray" />

  //         {/* Title 3 */}
  //         <div className="space-y-4 md:space-y-8 my-8 md:my-16">
  //           <h3 className="text-jp-p2 font-bold text-web-dark">タイトル3</h3>
  //           <p className="text-jp-p2 font-normal text-web-dark whitespace-pre-wrap">{`廃炉向け鉛遮へい付グローブボックス、分析用グローブボックスの設計、製作、据付工事を行いました。
  // このグローブボックス特徴は、高線量サンプルを取扱う際は、鉛遮へいを閉じて、マニピュレーターによる操作を行います。
  // 一方、低線量サンプルを扱う際は、鉛遮へいを開放し、グローブ操作が可能な構造となっています。`}</p>
  //           <p className="text-jp-p2 font-normal text-web-dark whitespace-pre-wrap">{`また、今回、新たな取り組みとして、内部目視用の鉛ガラスの代わりに、複数台のカメラを設置することで、グローブボックスの内部の全面モニタリングを可能としました。
  // （特許取得：特許6850464「遮蔽グローブボックス」）
  // 内部機構は、マニピュレーターと汎用ロボットの共用により、作業工程の時間の短縮化を図っています。
  // なお、鉛遮へい付グローブボックス内で希釈されたサンプルは、ダブルドアシステムを用いて、分析用のグローブボックスへと展開されます。`}</p>
  //         </div>
  //       </div>

  //       {/* Link */}
  //       <div className="md:hidden mx-auto my-6 md:my-8">
  //         <p className="text-jp-p2 font-normal text-[#0094FF] whitespace-pre-wrap">
  //           {detail.links.title}
  //         </p>
  //         <ul className="list-disc list-inside pl-2">
  //           {detail.links.bulletPoints.map((item, index) => (
  //             <li key={index} className="text-jp-p2 font-normal text-black">{item}</li>
  //           ))}
  //         </ul>

  //         <ol className="list-decimal list-inside pl-2">
  //           {detail.links.numberedList.map((item, index) => (
  //             <li key={index} className="text-jp-p2 font-normal text-black">{item}</li>
  //           ))}
  //         </ol>
  //       </div>

  //       <div className="hidden md:block container mx-auto my-6 md:my-8">
  //         <p className="text-jp-p2 font-normal text-[#0094FF] whitespace-pre-wrap">
  //           {detail.links.title}
  //         </p>
  //         <ul className="list-disc list-inside pl-2">
  //           {detail.links.bulletPoints.map((item, index) => (
  //             <li key={index} className="text-jp-p2 font-normal text-black">{item}</li>
  //           ))}
  //         </ul>

  //         <ol className="list-decimal list-inside pl-2">
  //           {detail.links.numberedList.map((item, index) => (
  //             <li key={index} className="text-jp-p2 font-normal text-black">{item}</li>
  //           ))}
  //         </ol>
  //       </div>

  //       {/* Navigation Button */}
  //       <div className="flex items-center gap-14 justify-center pt-[60px] pb-12 md:pt-[120px] md:pb-[115px]">
  //         <button className="rotate-180 text-web-main">
  //           <ChevronRight />
  //         </button>
  //         <button
  //           className="text-jp-h3 text-web-dark font-bold hover:opacity-30 transition-opacity"
  //           onClick={onBack}
  //         >
  //           {detail.navigation.back}
  //         </button>

  //         <button className="text-web-main">
  //           <ChevronRight />
  //         </button>
  //       </div>
  //     </section>
  //   );
}
