import {useState} from 'react';
import ArticlesList from '../Articles/ArticlesList';
import CreateArticle from '../Articles/CreateArticle';


export default function Articles(){
    const [view, setView] = useState(1);

    return (
        <div className="w-full h-full  ">
            <div className="w-full flex items-start gap-5 ">
                <button
                    onClick={() => setView(1)}
                    className={`${view === 1 ? "bg-rose-800 bakh-medium" : "bg-indigo-800 "} bakh-light text-sm text-wrap text-white rounded-tr-md rounded-tl-md h-12 w-32 transition duration-700 hover:bg-indigo-950`}
                >
                    ایجاد مقاله جدید
                </button>
                <button
                    onClick={() => setView(2)}
                    className={`${view === 2 ? "bg-rose-800 bakh-medium" : "bg-indigo-800"} bakh-light text-sm text-wrap text-white rounded-tr-md rounded-tl-md h-12 w-32 transition duration-700 hover:bg-indigo-950`}
                >
                    مشاهده لیست مقالات
                </button>
            </div>
            <div className="w-full mt-7">
                {view === 1 && <CreateArticle />}
                {view === 2 && <ArticlesList />}
            </div>


        </div>
    );
}