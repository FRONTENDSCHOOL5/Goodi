import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

// 이미지 파일
import SearchIcon from "../assets/icon_search_black.svg";
import MypageIcon from "../assets/icon_mypage_active.svg";
import CartIcon from "../assets/icon_cart_active.svg";
import ChatIcon from "../assets/icon_chat_active.svg";
import LogoutIcon from "../assets/icon_logout_active.svg";
import PostIcon from "../assets/icon_post_active.svg";
import HomeIcon from "../assets/icon_home_active.svg";

// 컴포넌트
import LocalNav from "./common/LocalNav";
import Modal from "./common/Modal";
import Search from "./common/Search";

export default function Navigation() {
  const navigate = useNavigate();
  const icons = [
    { name: "Search", image: SearchIcon, nav: "" },
    { name: "Home", image: HomeIcon, nav: "/main" },
    { name: "My page", image: MypageIcon, nav: "/profile" },
    { name: "Cart", image: CartIcon, nav: "/profileTest" },
    { name: "Chat", image: ChatIcon, nav: "/chat" },
    { name: "Post", image: PostIcon, nav: "" },
    { name: "Logout", image: LogoutIcon, nav: "" },
  ];

  // localNav hidden 관리
  // 예외처리 해줘야할것들:  x 버튼을 눌렀을 경우, 다른 곳을 클릭했을경우
  const [isHidden, setIsHidden] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLocalNav = () => {
    setIsHidden((prevIsHidden) => !prevIsHidden);
  };
  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  // const handleModal = () => {
  //   setShowModal(!showModal);
  // };
  // Post, LocalNav 외 다른곳을 눌렀을때 LocalNav 꺼지기
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navigationElement = document.getElementById("navigation");

      // GPT가 알려준 코드인데 이거 타겟 요소가 아닌곳을 클릭한 경우 false값을 반환하는데 그 외 모든것을 클릭했을 경우가 맞는건지? 첫번째 navigationElement 이건 진짜 뭔지 모르겠음
      if (navigationElement && !navigationElement.contains(event.target)) {
        setIsHidden(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <NavigationLayout id="navigation">
      {icons.map((el, i) => {
        return (
          <NavList
            className={el.name === "Post" && isHidden ? "active" : ""}
            key={i}
            onClick={() => {
              if (el.name === "Post") handleLocalNav();
              else if (el.name === "Logout") handleModal();
              else if (el.name === "Search") handleSearch();
              else navigate(el.nav);
            }}
          >
            <img src={el.image} alt={el.name} />
            <p className={i === 0 ? "a11y-hidden" : ""}>{el.name}</p>
            {el.name === "Post" && isHidden && <ActiveBar />}
          </NavList>
        );
      })}
      {isHidden ? <LocalNav /> : false}
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          handleModal={handleModal}
          text="구디 로그아웃?"
          buttonText1="로그아웃"
          buttonText2="취소"
          showCloseButton={false}
        />
      )}
      {showSearch && (
        <Search
          setShowSearch={setShowSearch}
          showModal={showModal}
          handleSearch={handleSearch}
        />
      )}
    </NavigationLayout>
  );
}

const NavigationLayout = styled.article`
  background-color: #ffffff;
  width: 80px;
  height: 100vh;
  border-left: 1px solid var(--gray200-color);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 16px;
  box-sizing: border-box;
  position: fixed;
  right: 0;
  z-index: 1;

  & > button:nth-child(1) {
    margin-bottom: 32px;
  }
`;

const NavList = styled.button`
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  text-align: center;
  color: var(--gray400-color);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 100;
  cursor: pointer;

  img {
    width: 28px;
    display: block;
  }

  &.active {
    background-color: #f0ffed;
    color: var(--dark-sub-color);
  }

  &:hover {
    background-color: #f0ffed;
    transition: all 0.3s;
    color: var(--dark-sub-color);
  }
`;

const ActiveBar = styled.div`
  width: calc(100% - 12px);
  height: 3px;
  background-color: var(--main-color);
  position: absolute;
  bottom: 0;
`;
