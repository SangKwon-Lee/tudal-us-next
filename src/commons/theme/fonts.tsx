import { css, SerializedStyles } from "@emotion/react";

export interface FontsType {
  s12_w400: SerializedStyles;
  s12_w500: SerializedStyles;
  s12_w700: SerializedStyles;
  s14_w400: SerializedStyles;
  s14_w500: SerializedStyles;
  s14_w700: SerializedStyles;
  s16_w400: SerializedStyles;
  s16_w500: SerializedStyles;
  s16_w700: SerializedStyles;
  s18_w400: SerializedStyles;
  s18_w500: SerializedStyles;
  s18_w700: SerializedStyles;
  s20_w400: SerializedStyles;
  s20_w500: SerializedStyles;
  s20_w700: SerializedStyles;
  s24_w400: SerializedStyles;
  s24_w500: SerializedStyles;
  s24_w700: SerializedStyles;
}

const Fonts: FontsType = {
  s12_w400: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 100%;
  `,
  s12_w500: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 100%;
  `,
  s12_w700: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 100%;
  `,
  s14_w400: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 100%;
  `,
  s14_w500: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 100%;
  `,
  s14_w700: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 100%;
  `,
  s16_w400: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 120%;
  `,
  s16_w500: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 120%;
  `,
  s16_w700: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 120%;
  `,
  s18_w400: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 110%;
  `,
  s18_w500: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 110%;
  `,
  s18_w700: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 110%;
  `,
  s20_w400: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 140%;
  `,
  s20_w500: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 140%;
  `,
  s20_w700: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 140%;
  `,
  s24_w400: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 160%;
  `,
  s24_w500: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 160%;
  `,
  s24_w700: css`
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 160%;
  `,
};

export default Fonts;
