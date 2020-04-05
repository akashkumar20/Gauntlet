import styled from 'styled-components';

const CanvasStyled = styled.div`
    .fade-out{
        animation: fadeOut ease 4s;
    }

    .hidden{
      opacity: 0;
    }

    .fade-in{
      animation: fadeIn ease 5s;
    }

    @keyframes fadeOut {
      0% {
        opacity:1;
      }
      100% {
        opacity:0;
      }
    }

    @keyframes fadeIn {
      0% {
        opacity:0;
      }
      100% {
        opacity:1;
      }
    }
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 110px;
  margin: 0px;
  figure{
    width: 100px;
    img{
      width: 100px;
    }
  }
`;

const UserHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const ImageButton = styled.button`
border: 0;
background: transparent;
.thanos-btn{
  position: absolute;
  top: 0;
  right: 0;
  .thanos-gauntlet{
    width: 75px;
    min-height: 152px;
    img{
      width: 75px;
      min-height: 152px;
    }
  }
  .thanos-snap{
    width: 110px;
    display: none;
    min-height: 152px;
    img{
      width: 110px;
      min-height: 152px;
    }
  }
  &:hover,active{
    .thanos-gauntlet{
      display: none;
    }
    .thanos-snap{
      display: block;
      outline: none;
    }
  }
  &:disabled,hover{
    opacity: 0.75
    .thanos-gauntlet{
      display: block;
    }
    .thanos-snap{
      display: none;
    }
  }
}
.ironman-btn{
  position: absolute;
  top: 0;
  right: 0;
  .ironman-gauntlet{
    width: 75px;
    min-height: 152px;
    img{
      width: 75px;
      min-height: 152px;
    }
  }
  .ironman-snap{
    width: 110px;
    display: none;
    min-height: 152px;
    img{
      width: 110px;
      min-height: 152px;
    }
  }
  &:hover,active{
    .ironman-gauntlet{
      display: none;
    }
    .ironman-snap{
      display: block;
      outline: none;
    }
  }
  &:focus{
    outline:none;
  }
}
    &:disabled,hover{
      opacity: 0.75
      .thanos-btn{
        .thanos-gauntlet{
          display: block;
        }
        .thanos-snap{
          display: none;
        }
      }
    }
`;

export default CanvasStyled;
export { User, UserHolder, ImageButton };
