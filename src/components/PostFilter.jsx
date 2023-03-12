import React from 'react';
import Myselect from "./UI/select/Myselect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <input type="text"
                   placeholder="Поиск"
                   value={filter.query}
                   onChange={e=> setFilter({...filter, query: e.target.value})}/>
            <Myselect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Сортировка по"
                options={[
                    {value: "title", name: "По заголовку"},
                    {value: "body", name: "По описанию"}
                ]}/>
        </div>
    );
};

export default PostFilter;