import React from "react";
import Slider from "../../components/Slider/Slider";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <Slider />
      <FeaturedProducts
        type="featured"
        para="Fashion is a constantly evolving and dynamic industry that plays a significant role in our lives. It is a form of self-expression that enables us to convey our personality, culture, and beliefs through our clothing and accessories. Fashion has the power to make us feel confident, comfortable, and stylish, and it can also reflect the changing cultural, social, and political attitudes of a society. Whether it's haute couture or streetwear, fashion is an art form that continues to inspire and captivate people around the world."
      />
      <Categories />
      <FeaturedProducts
        type="trending"
        para="Fashion is a form of self-expression that allows individuals to showcase their unique personalities and styles. It's an art form that involves combining different elements such as colors, textures, and patterns to create an outfit that is visually pleasing and reflective of one's individuality. The beauty of fashion lies in its ability to be ever-evolving, allowing individuals to constantly explore new styles and trends while also creating their own. Fashion is a powerful tool that not only makes individuals look good but also feel good about themselves, boosting their confidence and self-esteem."
      />
      <NewsLetter />
    </div>
  );
}

export default Home;
