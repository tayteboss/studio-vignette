import styled from "styled-components";
import { ProductGalleryBlock } from "../../../shared/types/types";
import ProductFeature from "../ProductFeature";
import Link from "next/link";
import pxToRem from "../../../utils/pxToRem";
import Image from "next/image";

const ProductCardWrapper = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 125%;
  position: relative;
  margin-bottom: ${pxToRem(20)};
  cursor: pointer;
`;

const ImageInner = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid;
  border-color: ${(props) =>
    props.$isActive ? "var(--color-primary)" : "transparent"};

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const ContentWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(15)};
  opacity: ${(props) => (props.$isActive ? 1 : 0)};

  transition: all var(--transition-speed-default) var(--transition-ease);

  a {
    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

const Title = styled.h3``;

const Description = styled.p``;

const Features = styled.div``;

type Props = {
  image: ProductGalleryBlock["productGalleryBlockPB"]["products"][0]["image"];
  title: ProductGalleryBlock["productGalleryBlockPB"]["products"][0]["title"];
  description: ProductGalleryBlock["productGalleryBlockPB"]["products"][0]["description"];
  link: ProductGalleryBlock["productGalleryBlockPB"]["products"][0]["link"];
  features: ProductGalleryBlock["productGalleryBlockPB"]["products"][0]["features"];
  isActive: boolean;
  index: number;
  setActiveIndex: (index: number) => void;
};

const ProductCard = (props: Props) => {
  const {
    image,
    title,
    description,
    link,
    features,
    isActive,
    index,
    setActiveIndex,
  } = props;

  const hasFeatures = features && features.length > 0;

  return (
    <ProductCardWrapper className={isActive ? "trigger-colour" : ""}>
      <ImageWrapper onClick={() => setActiveIndex(index)}>
        {image && (
          <ImageInner className="image-colour-base" $isActive={isActive}>
            <Image
              src={image.asset.url}
              alt={title}
              priority={false}
              fill
              style={{ objectFit: "cover" }}
              sizes={"(max-width: 768px) 50vw, 17vw"}
              loading="lazy"
            />
          </ImageInner>
        )}
      </ImageWrapper>
      <ContentWrapper $isActive={isActive}>
        {link ? (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            {title && (
              <Title className="type-small uppercase underline">{title}</Title>
            )}
          </Link>
        ) : (
          title && <Title className="type-small uppercase">{title}</Title>
        )}
        {hasFeatures && (
          <Features>
            {features.map((feature, i) => (
              <ProductFeature
                key={`${feature.title}-${i}`}
                title={feature.title}
                value={feature.value}
              />
            ))}
          </Features>
        )}
        {description && (
          <Description className="type-small">{description}</Description>
        )}
      </ContentWrapper>
    </ProductCardWrapper>
  );
};

export default ProductCard;
