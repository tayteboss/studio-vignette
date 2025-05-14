import styled from "styled-components";
import {
  ConsiderationsBlock,
  MediaRatioType,
} from "../../../shared/types/types";
import Image from "next/image";
import pxToRem from "../../../utils/pxToRem";

const ConsiderationCardWrapper = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div<{ $ratio: MediaRatioType }>`
  width: 100%;
  position: relative;
  padding-top: ${({ $ratio }) => $ratio};
  margin-bottom: ${pxToRem(10)};
`;

const ImageInner = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: ${pxToRem(10)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    gap: ${pxToRem(8)};
  }
`;

const Num = styled.p`
  font-size: ${pxToRem(14)};
  line-height: 1;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(10)};
  }
`;

const Description = styled.p``;

type Props = {
  title: ConsiderationsBlock["considerationsBlockPB"]["considerations"][0]["title"];
  description: ConsiderationsBlock["considerationsBlockPB"]["considerations"][0]["description"];
  image: ConsiderationsBlock["considerationsBlockPB"]["considerations"][0]["image"];
  imageRatio: ConsiderationsBlock["considerationsBlockPB"]["considerations"][0]["imageRatio"];
  index: number;
};

const ConsiderationCard = (props: Props) => {
  const { title, description, image, imageRatio, index } = props;

  return (
    <ConsiderationCardWrapper className="considerations-card hover-trigger-colour">
      <ImageWrapper $ratio={imageRatio}>
        <ImageInner className="image-colour-base">
          {image?.asset.url && (
            <Image
              src={image?.asset.url}
              alt={title}
              priority={false}
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
              sizes={undefined}
            />
          )}
        </ImageInner>
      </ImageWrapper>
      <ContentWrapper>
        <Num>{["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"][index]}</Num>
        <Description className="type-h6">{description}</Description>
      </ContentWrapper>
    </ConsiderationCardWrapper>
  );
};

export default ConsiderationCard;
