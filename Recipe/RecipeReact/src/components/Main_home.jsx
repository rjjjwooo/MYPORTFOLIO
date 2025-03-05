import React from "react";
import Main_catalog from './Main_catalog';
import Main_recipe_list from './Main_recipe_list';

const Main_home = (props)=>{
    const data = props.loading.current;
    return (
        <main>
            <Main_catalog data={data}></Main_catalog>
            <Main_recipe_list></Main_recipe_list>
        </main>
    );
}

export default Main_home;