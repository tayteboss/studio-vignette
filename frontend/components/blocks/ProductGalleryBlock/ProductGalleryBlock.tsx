import styled from "styled-components";
import { ProductGalleryBlock as ProductGalleryBlockType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import ProductCard from "../../elements/ProductCard";

const ProductGalleryBlockWrapper = styled.section`
  margin-bottom: ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(50)};
  }
`;

const Embla = styled.div``;

const Container = styled.div`
  padding-left: ${pxToRem(20)};
  margin-right: ${pxToRem(20)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-left: ${pxToRem(15)};
    margin-right: ${pxToRem(15)};
  }
`;

const Slide = styled.div`
  flex: 0 0 calc((100% / 12) * 2);
  margin-right: ${pxToRem(20)};

  &.embla__slide {
    min-width: ${pxToRem(200)};
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    flex: 0 0 calc((100% / 8) * 4);
    margin-right: ${pxToRem(5)};
  }

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    flex: 0 0 calc((100% / 8) * 6);

    &.embla__slide {
      min-width: ${pxToRem(200)};
    }
  }
`;

type Props = ProductGalleryBlockType;

const ProductGalleryBlock = (props: Props) => {
  const { productGalleryBlockPB } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const { products } = productGalleryBlockPB;

  const hasProducts = products && products.length > 0;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    skipSnaps: true,
  });

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setActiveIndex(emblaApi.selectedScrollSnap());
      };

      emblaApi.on("select", onSelect);

      return () => {
        if (emblaApi) {
          emblaApi.off("select", onSelect);
        }
      };
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi && activeIndex !== emblaApi.selectedScrollSnap()) {
      emblaApi.scrollTo(activeIndex);
    }
  }, [emblaApi, activeIndex]);

  return (
    <ProductGalleryBlockWrapper>
      <Embla className="embla" ref={emblaRef}>
        <Container className="embla__container">
          {hasProducts &&
            products.map((product, i) => (
              <Slide className="embla__slide" key={i}>
                <ProductCard
                  image={product.image}
                  title={product.title}
                  description={product.description}
                  link={product.link}
                  features={product.features}
                  isActive={activeIndex === i}
                  index={i}
                  setActiveIndex={setActiveIndex}
                />
              </Slide>
            ))}
        </Container>
      </Embla>
    </ProductGalleryBlockWrapper>
  );
};

export default ProductGalleryBlock;
