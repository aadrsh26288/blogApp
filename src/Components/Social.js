import React from "react";

const Social = ({ article }) => {
	console.log("jdjdj", article);
	return (
		<div className=' mt-10'>
			{/* <div className='grid grid-cols-2 gap-4'>
				{article.slice(3, 5).map((a) => {
					return (
						<div className='h-full '>
							<div>
								<img src={a.imageUrl} className='w-full object-cover' />
								<div className='bg-white h-[130px] p-3'>
									<p className='text-[20px] font-bold mon '>{a.title}</p>
									<p className='text-[12px] mon'>{a.createdBy}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div> */}

			<div className=' bg-white flex flex-col gap-2'>
				<h1 className='text-[25px] mon font-bold p-2 '>Popular blogs</h1>
				{article.slice(0, 3).map((a) => {
					return (
						<div className='flex gap-4 items-center p-3'>
							<img
								src={a.imageUrl}
								className='h-[50px] w-[70px] object-cover'
							/>
							<div>
								<p className='text-[16px] mon font-semibold'>{a.title}</p>
								<p>{a.createdBy}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Social;
