import * as React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="1280.000000pt"
          height="796.000000pt"
          viewBox="0 0 1280.000000 796.000000"
          preserveAspectRatio="xMidYMid meet"
          className="color-red-500 h-12 w-12 fill-red-500"
        >
          <metadata>
            Created by potrace 1.15, written by Peter Selinger 2001-2017
          </metadata>
          <g
            transform="translate(0.000000,796.000000) scale(0.100000,-0.100000)"
            fill="currentColor"
            stroke="none"
          >
            <path
              d="M4892 7949 c-510 -32 -1026 -194 -1438 -451 -743 -463 -1255 -1223
-1510 -2242 -19 -78 -50 -188 -69 -246 -65 -204 -95 -419 -95 -685 0 -89 -3
-203 -6 -252 l-7 -90 -66 -39 c-97 -57 -295 -191 -413 -280 -685 -518 -1099
-1049 -1238 -1588 -91 -352 -56 -684 106 -1026 139 -292 378 -562 635 -718
263 -160 563 -258 944 -309 184 -24 657 -24 885 0 1051 113 2251 489 3545
1114 318 154 350 172 360 204 25 79 -149 57 -402 -52 -676 -291 -1499 -564
-2163 -719 -328 -77 -699 -141 -1010 -176 -227 -25 -738 -30 -930 -10 -443 48
-772 159 -1050 354 -94 67 -276 254 -342 352 -115 173 -178 329 -205 508 -50
332 84 701 382 1052 257 302 712 658 1112 869 l61 33 80 -57 c253 -177 718
-318 1282 -390 69 -9 129 -20 133 -24 4 -4 -24 -28 -62 -54 -108 -72 -141
-104 -141 -139 0 -43 46 -81 143 -118 230 -88 461 -220 658 -375 73 -58 88
-66 115 -60 29 5 34 1 73 -55 24 -34 71 -90 105 -126 l61 -64 62 0 61 0 46
-79 c44 -76 94 -131 120 -131 7 0 24 -20 37 -44 l23 -44 19 31 c16 26 18 42
13 97 -6 54 -18 86 -72 188 -36 68 -64 125 -62 127 2 2 46 -34 98 -80 74 -66
102 -84 126 -84 61 -2 92 -21 139 -86 48 -68 92 -108 110 -101 16 6 42 -16 59
-50 l15 -28 16 38 c25 60 17 83 -85 245 -28 46 -54 90 -57 98 -8 21 169 -107
237 -172 64 -60 93 -77 123 -74 34 4 64 -9 91 -42 l25 -29 7 35 c3 19 4 43 1
53 -21 65 -38 97 -63 117 l-28 22 56 -1 c31 -2 64 -8 73 -16 21 -18 29 -7 21
33 -10 51 -44 78 -113 86 -51 6 -69 14 -138 67 -300 228 -393 266 -689 284
-188 11 -248 25 -373 86 -110 54 -209 123 -298 205 -74 70 -74 83 3 92 87 10
270 85 388 159 22 14 142 54 279 92 132 37 262 74 289 82 27 8 55 14 62 14 6
0 56 -34 110 -76 84 -64 104 -75 129 -71 28 5 34 -1 85 -70 30 -41 78 -97 107
-124 50 -47 54 -49 112 -49 l60 0 32 -60 c36 -69 104 -150 124 -150 18 0 55
-48 55 -71 0 -31 16 -22 35 21 28 62 15 121 -60 271 -36 71 -65 131 -65 135 0
3 35 -25 78 -62 42 -38 87 -76 98 -87 13 -10 42 -20 70 -22 44 -3 53 -8 89
-51 81 -95 125 -136 139 -131 14 6 59 -36 69 -63 7 -23 27 34 27 80 0 30 -17
66 -79 169 -44 72 -75 128 -68 124 61 -37 193 -136 237 -178 62 -59 91 -77
123 -75 39 4 46 1 81 -34 l34 -35 7 36 c9 47 -21 127 -61 162 l-30 27 53 -1
c33 0 60 -6 72 -17 18 -15 19 -15 23 7 6 27 -12 74 -35 93 -8 7 -42 16 -74 19
-53 6 -67 13 -154 79 -291 220 -380 256 -682 274 -139 8 -260 29 -280 49 -7 7
202 56 352 82 99 16 316 25 411 16 125 -11 197 -36 271 -93 35 -27 98 -66 139
-88 188 -97 304 -186 554 -424 65 -63 131 -118 146 -123 23 -9 28 -17 32 -53
11 -93 125 -282 244 -403 57 -58 75 -71 93 -66 17 4 31 -4 60 -35 37 -38 39
-40 45 -19 8 30 8 82 -1 90 -3 4 -7 41 -8 81 l-1 75 35 -31 c31 -27 39 -30 81
-25 42 5 52 2 96 -30 63 -46 146 -83 185 -83 38 0 81 -22 107 -55 24 -30 33
-21 34 34 0 42 -16 79 -44 99 -16 12 -27 62 -13 62 3 0 19 -16 36 -35 37 -42
96 -61 140 -46 26 9 33 7 63 -24 33 -33 34 -33 40 -12 11 41 6 72 -16 107 -22
34 -58 108 -58 117 0 3 16 -5 35 -17 19 -12 39 -18 45 -15 6 4 26 -2 45 -13
28 -17 34 -18 39 -6 9 22 -12 66 -47 100 -18 17 -43 43 -56 58 -46 52 -134 83
-281 100 -170 20 -174 21 -322 99 -68 36 -137 68 -155 72 -20 4 -49 25 -80 58
-62 67 -243 283 -243 290 0 3 55 3 123 0 111 -5 418 9 508 23 36 6 37 6 63
-52 68 -148 246 -364 300 -364 19 0 39 -11 64 -36 41 -41 56 -32 47 31 -3 22
-7 67 -8 100 -2 33 -7 71 -11 84 -8 22 -4 21 35 -13 40 -34 48 -37 89 -31 42
5 50 2 119 -45 41 -27 78 -50 82 -50 4 0 -3 -19 -16 -43 -14 -23 -25 -48 -25
-54 0 -26 16 -11 38 37 l23 49 47 -5 c26 -3 57 -10 68 -16 21 -10 20 -12 -25
-72 -59 -78 -116 -196 -94 -196 5 0 21 28 36 63 15 34 48 89 74 121 l46 59 17
-21 c15 -18 19 -19 24 -6 3 9 6 29 6 44 0 58 114 107 168 72 12 -8 22 -19 21
-26 0 -6 -26 -33 -57 -60 -130 -114 -237 -269 -257 -374 -10 -51 12 -38 24 16
56 230 417 533 916 767 l114 54 23 -36 c12 -20 18 -38 12 -40 -5 -2 -67 -40
-139 -84 -372 -232 -680 -521 -799 -749 -38 -73 -76 -188 -76 -231 0 -52 15
-31 28 39 15 81 74 208 139 300 135 189 409 427 713 619 137 87 161 98 171 81
5 -7 9 -16 9 -19 0 -3 -48 -41 -107 -84 -357 -262 -619 -543 -739 -791 -54
-112 -94 -294 -64 -294 6 0 10 13 10 28 0 53 40 187 79 267 125 253 392 530
788 818 l52 38 68 -55 c71 -59 136 -89 218 -101 28 -4 68 -18 90 -31 140 -81
317 -65 430 37 63 58 85 113 83 204 -1 33 4 93 11 132 16 85 -19 67 278 143
347 89 622 130 878 130 229 0 402 -36 507 -105 21 -14 42 -25 48 -25 19 0 10
15 -23 37 -201 137 -615 153 -1152 47 -126 -25 -380 -88 -478 -117 -45 -14
-72 -7 -51 13 15 14 275 116 447 176 336 115 599 168 842 168 168 0 243 -12
327 -55 40 -21 58 -24 58 -10 0 16 -120 62 -202 78 -64 12 -119 14 -238 10
-291 -11 -624 -95 -1059 -268 -170 -68 -190 -72 -191 -37 0 29 550 254 790
323 382 110 639 119 843 30 10 -4 17 -3 17 4 0 15 -46 37 -120 56 -281 73
-740 -26 -1328 -287 -112 -50 -206 -87 -210 -84 -15 16 21 42 143 108 349 188
671 314 930 364 131 26 310 24 395 -4 35 -12 66 -19 69 -16 11 11 -20 25 -99
45 -265 67 -717 -58 -1277 -356 -89 -47 -164 -85 -167 -85 -3 0 -6 9 -6 20 0
14 30 40 103 88 486 326 889 477 1115 418 60 -15 82 -3 25 14 -162 47 -399 -4
-698 -150 -132 -64 -334 -183 -466 -274 -44 -31 -82 -56 -85 -56 -2 0 -4 9 -4
19 0 42 365 359 560 487 206 135 410 212 537 201 70 -5 86 7 22 18 -133 23
-376 -69 -605 -227 -112 -76 -288 -221 -411 -335 -111 -104 -112 -104 -119
-76 -50 230 -175 532 -261 632 -26 31 -43 73 -83 207 -96 319 -203 612 -296
813 -24 52 -43 95 -42 96 2 1 25 16 51 34 61 41 99 93 152 206 118 250 199
571 199 785 1 222 -97 543 -201 659 -32 36 -46 44 -83 48 -36 4 -52 0 -79 -19
-19 -12 -126 -140 -238 -283 -112 -143 -269 -342 -348 -442 l-144 -181 -63 21
c-55 18 -87 21 -255 21 -105 1 -193 3 -196 6 -2 3 -50 61 -107 130 -129 157
-412 439 -551 548 -313 247 -644 409 -961 472 -169 33 -239 40 -543 55 -317
16 -371 25 -491 81 -351 161 -736 256 -1159 284 -167 11 -243 11 -423 -1z
m4995 -4417 c8 -5 -23 -13 -79 -20 -175 -23 -393 -74 -538 -125 -131 -46 -153
-50 -230 -50 -81 0 -200 25 -200 41 0 13 586 138 733 157 111 14 286 12 314
-3z m84 -34 c8 -7 20 -25 27 -40 11 -27 10 -28 -31 -38 -105 -27 -363 -113
-472 -158 l-120 -49 -30 22 c-44 33 -106 62 -159 76 -26 6 -45 13 -43 15 2 3
56 22 119 43 133 46 340 93 518 120 153 23 172 24 191 9z m49 -92 c0 -2 3 -11
6 -19 4 -11 -20 -24 -93 -52 -136 -52 -239 -97 -368 -162 l-110 -55 -38 36
-38 35 31 16 c121 63 610 224 610 201z m35 -73 c3 -10 1 -19 -6 -22 -7 -2 -78
-36 -158 -76 -168 -83 -333 -179 -442 -257 l-76 -55 -12 41 c-6 23 -14 46 -17
52 -3 6 12 22 33 34 29 17 41 20 55 11 14 -8 17 -6 20 12 2 17 29 36 118 81
119 62 433 195 461 195 9 1 20 -7 24 -16z m-690 -243 l30 -6 -35 -22 -35 -22
-17 33 c-23 43 -22 50 5 36 12 -7 36 -15 52 -19z m-235 -121 c40 -39 42 -42
25 -57 -15 -14 -18 -15 -23 -3 -3 8 -15 24 -28 36 -19 18 -34 65 -21 65 2 0
23 -18 47 -41z"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Loading;