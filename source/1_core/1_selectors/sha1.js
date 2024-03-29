(function (module) {/*
 A JavaScript implementation of the SHA family of hashes, as defined in FIPS
 PUB 180-2 as well as the corresponding HMAC implementation as defined in
 FIPS PUB 198a

 Copyright Brian Turek 2008-2013
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnson
 */
  function k (d) {
    throw d;
  }

  function s (d, f) {
    var a = [], b, c = [], e = 0, g;
    if("UTF8" == f) {
      for(g = 0; g < d.length; g += 1) {
        b = d.charCodeAt(g);
        c = [];
        2048 < b ? (c[0] = 224 | (b & 61440) >>> 12, c[1] = 128 | (b & 4032) >>> 6, c[2] = 128 | b & 63) : 128 < b ? (c[0] = 192 | (b & 1984) >>> 6, c[1] = 128 | b & 63) : c[0] = b;
        for(b = 0; b < c.length; b += 1) {
          a[e >>> 2] |= c[b] << 24 - 8 * (e % 4), e += 1
        }
      }
    }
    else if("UTF16" == f) {
      for(g = 0; g < d.length; g += 1) {
        a[e >>> 2] |= d.charCodeAt(g) << 16 - 8 * (e % 4), e += 2;
      }
    }
    return{value: a, binLen: 8 * e}
  }

  function u (d) {
    var f = [], a = d.length, b, c;
    0 !== a % 2 && k("String of HEX type must be in byte increments");
    for(b = 0; b < a; b += 2) {
      c = parseInt(d.substr(b, 2), 16), isNaN(c) && k("String of HEX type contains invalid characters"), f[b >>> 3] |= c << 24 - 4 * (b % 8);
    }
    return{value: f, binLen: 4 * a}
  }

  function v (d) {
    var f = [], a = 0, b, c, e, g, h;
    -1 === d.search(/^[a-zA-Z0-9=+\/]+$/) && k("Invalid character in base-64 string");
    b = d.indexOf("=");
    d = d.replace(/\=/g, "");
    -1 !== b && b < d.length && k("Invalid '=' found in base-64 string");
    for(c = 0; c < d.length; c += 4) {
      h = d.substr(c, 4);
      for(e = g = 0; e < h.length; e += 1) {
        b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(h[e]), g |= b << 18 - 6 * e;
      }
      for(e = 0; e < h.length - 1; e += 1) {
        f[a >> 2] |= (g >>> 16 - 8 * e & 255) << 24 - 8 * (a % 4), a += 1
      }
    }
    return{value: f, binLen: 8 * a}
  }

  function w (d, f) {
    var a = "", b = 4 * d.length, c, e;
    for(c = 0; c < b; c += 1) {
      e = d[c >>> 2] >>> 8 * (3 - c % 4), a += "0123456789abcdef".charAt(e >>> 4 & 15) + "0123456789abcdef".charAt(e & 15);
    }
    return f.outputUpper ? a.toUpperCase() : a
  }

  function x (d, f) {
    var a = "", b = 4 * d.length, c, e, g;
    for(c = 0; c < b; c += 3) {
      g = (d[c >>> 2] >>> 8 * (3 - c % 4) & 255) << 16 | (d[c + 1 >>> 2] >>> 8 * (3 - (c + 1) % 4) & 255) << 8 | d[c + 2 >>> 2] >>> 8 * (3 - (c + 2) % 4) & 255;
      for(e = 0; 4 > e; e += 1) {
        a = 8 * c + 6 * e <= 32 * d.length ? a + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >>> 6 * (3 - e) & 63) : a + f.b64Pad
      }
    }
    return a
  }

  function y (d) {
    var f = {outputUpper: !1, b64Pad: "="};
    try {
      d.hasOwnProperty("outputUpper") && (f.outputUpper = d.outputUpper), d.hasOwnProperty("b64Pad") && (f.b64Pad = d.b64Pad)
    } catch (a) {
    }
    "boolean" !== typeof f.outputUpper && k("Invalid outputUpper formatting option");
    "string" !== typeof f.b64Pad && k("Invalid b64Pad formatting option");
    return f
  }

  function z (d, f) {
    var a = (d & 65535) + (f & 65535);
    return((d >>> 16) + (f >>> 16) + (a >>> 16) & 65535) << 16 | a & 65535
  }

  function A (d, f, a, b, c) {
    var e = (d & 65535) + (f & 65535) + (a & 65535) + (b & 65535) + (c & 65535);
    return((d >>> 16) + (f >>> 16) + (a >>> 16) + (b >>> 16) + (c >>> 16) + (e >>> 16) & 65535) << 16 | e & 65535
  }

  function B (d, f) {
    var a = [], b, c, e, g, h, C, t, j, D, l = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], n = [1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393,
      1859775393, 1859775393, 1859775393, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782];
    d[f >>> 5] |= 128 << 24 - f % 32;
    d[(f +
        65 >>> 9 << 4) + 15] = f;
    D = d.length;
    for(t = 0; t < D; t += 16) {
      b = l[0];
      c = l[1];
      e = l[2];
      g = l[3];
      h = l[4];
      for(j = 0; 80 > j; j += 1) {
        a[j] = 16 > j ? d[j + t] : (a[j - 3] ^ a[j - 8] ^ a[j - 14] ^ a[j - 16]) << 1 | (a[j - 3] ^ a[j - 8] ^ a[j - 14] ^ a[j - 16]) >>> 31, C = 20 > j ? A(b << 5 | b >>> 27, c & e ^ ~c & g, h, n[j], a[j]) : 40 > j ? A(b << 5 | b >>> 27, c ^ e ^ g, h, n[j], a[j]) : 60 > j ? A(b << 5 | b >>> 27, c & e ^ c & g ^ e & g, h, n[j], a[j]) : A(b << 5 | b >>> 27, c ^ e ^ g, h, n[j], a[j]), h = g, g = e, e = c << 30 | c >>> 2, c = b, b = C;
      }
      l[0] = z(b, l[0]);
      l[1] = z(c, l[1]);
      l[2] = z(e, l[2]);
      l[3] = z(g, l[3]);
      l[4] = z(h, l[4])
    }
    return l
  }

  module.jsSHA = function (d, f, a) {
    var b = null, c = 0, e = [0], g = "", h = null, g = "undefined" !== typeof a ? a : "UTF8";
    "UTF8" === g || "UTF16" === g || k("encoding must be UTF8 or UTF16");
    "HEX" === f ? (0 !== d.length % 2 && k("srcString of HEX type must be in byte increments"), h = u(d), c = h.binLen, e = h.value) : "ASCII" === f || "TEXT" === f ? (h = s(d, g), c = h.binLen, e = h.value) : "B64" === f ? (h = v(d), c = h.binLen, e = h.value) : k("inputFormat must be HEX, TEXT, ASCII, or B64");
    this.getHash = function (a, d, f) {
      var g = null, h = e.slice(), n = "";
      switch (d) {
        case "HEX":
          g = w;
          break;
        case "B64":
          g =
              x;
          break;
        default:
          k("format must be HEX or B64")
      }
      "SHA-1" === a ? (null === b && (b = B(h, c)), n = g(b, y(f))) : k("Chosen SHA variant is not supported");
      return n
    };
    this.getHMAC = function (b, a, d, f, h) {
      var n, p, m, E, r, F, G = [], H = [], q = null;
      switch (f) {
        case "HEX":
          n = w;
          break;
        case "B64":
          n = x;
          break;
        default:
          k("outputFormat must be HEX or B64")
      }
      "SHA-1" === d ? (m = 64, F = 160) : k("Chosen SHA variant is not supported");
      "HEX" === a ? (q = u(b), r = q.binLen, p = q.value) : "ASCII" === a || "TEXT" === a ? (q = s(b, g), r = q.binLen, p = q.value) : "B64" === a ? (q = v(b), r = q.binLen, p =
          q.value) : k("inputFormat must be HEX, TEXT, ASCII, or B64");
      b = 8 * m;
      a = m / 4 - 1;
      m < r / 8 ? ("SHA-1" === d ? p = B(p, r) : k("Unexpected error in HMAC implementation"), p[a] &= 4294967040) : m > r / 8 && (p[a] &= 4294967040);
      for(m = 0; m <= a; m += 1) {
        G[m] = p[m] ^ 909522486, H[m] = p[m] ^ 1549556828;
      }
      "SHA-1" === d ? E = B(H.concat(B(G.concat(e), b + c)), b + F) : k("Unexpected error in HMAC implementation");
      return n(E, y(h))
    }
  };
})(this);