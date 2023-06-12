import React from "react";
import styled from "styled-components";
import CardProduct from "../components/common/CardProduct";
import { Link } from "react-router-dom";

import commonBanner from "../assets/common-banner.svg";
import arrowPrimaryIcon from "../assets/icon_arrow_primary.svg";
import pointEdge from "../assets/point-edge.svg";
import followerProducts from "../assets/follower-products.svg";
import popularAuthor from "../assets/popular-author.svg";

import PopularAuthorView from "../components/PopularAuthorView";
import PopularAuthorData from "../mock/PopularAuthorData";
import MainLayout from "../layout/MainLayout";

export default function Main() {
  const data = PopularAuthorData[0];
  const data1 = PopularAuthorData[1];
  const data2 = PopularAuthorData[2];

  return (
    <MainLayout>
      <MainLeft>
        <article>
          <img
            src={commonBanner}
            alt="팔로워 인기 TOP 3위 작가님들 지금 바로 상품구경"
          />
        </article>
        <section>
          <h2 className="a11y-hidden">팔로워 인기 TOP 3 작가 작품</h2>
          <ul>
            {data.map((item) => {
              return (
                <li key={item.id}>
                  <img src={item.dummyImg} alt="" />
                </li>
              )
            })}
          </ul>
        </section>
      </MainLeft>

      <span className="Line" />

      <MainRight>
        <Title><img src={followerProducts} alt="Follower Products" /></Title>
        <CardProduct />
        <ProductLink to="/">나도 굿즈 판매하기</ProductLink>
      </MainRight>

      <MainBottom>
        <Title><img src={popularAuthor} alt="Popular Author" /></Title>
        <PopularAuthorView data={data1} />
        <PopularAuthorView data={data2} />
      </MainBottom >
    </MainLayout>
  );
}

const MainLeft = styled.section`
  article {
    margin-bottom: 16px;
  }

  img {
    width: 100%;
  }
`;

const MainRight = styled.section`
  padding-right: 60px;
`;

const MainBottom = styled.section`
  padding: 110px 60px 150px 80px;
  grid-row: 2 / 3;
  grid-column: 1 / 4;

  section {
    margin: 50px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    display: grid;
    grid-template-columns: 2fr repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;

    & img {
      width: 100%;
      height: 100%;
    }

    li {
      width: 100%;
      height: 100%;
      position: relative;

      &:hover div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        flex-direction: column;
        animation: setMotion 0.2s;
      }
    }
  }

  li:first-child {
    grid-row: 1 / span 2;
    grid-column: 1 / 2;
  }

  @keyframes setMotion {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Title = styled.h2`
  position: relative;

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: -35px;
    left: -25px;
    width: 130px;
    height: 40px;
    background: url(${pointEdge}) no-repeat center/contain;
    vertical-align: bottom;
  }
`;

const ProductLink = styled(Link)`
  width: 217px;
  height: 56px;
  padding: 12px 24px;
  margin: 0 auto;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;

  background-color: black;
  color: white;
  border-radius: 30px;

  font-size: 18px;
  font-family: var(--font--semibold);
  text-decoration: none;
  white-space: nowrap;

  &::after {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    background: url(${arrowPrimaryIcon}) no-repeat center/cover;
  }
  /* ButtonLineIconUI 랑 중복 줄일 수 있을 것 같은데 */
`;
