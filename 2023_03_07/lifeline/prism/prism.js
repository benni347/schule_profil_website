/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=clike+go+python&plugins=line-numbers+match-braces */
const _self =
    typeof window !== 'undefined'
      ? window
      : typeof WorkerGlobalScope !== 'undefined' &&
          self instanceof WorkerGlobalScope
        ? self
        : {}
const Prism = (function (e) {
  const n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i
  let t = 0
  const r = {}
  var a = {
    manual: e.Prism && e.Prism.manual,
    disableWorkerMessageHandler:
            e.Prism && e.Prism.disableWorkerMessageHandler,
    util: {
      encode: function e (n) {
        return n instanceof i
          ? new i(n.type, e(n.content), n.alias)
          : Array.isArray(n)
            ? n.map(e)
            : n
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/\u00a0/g, ' ')
      },
      type: function (e) {
        return Object.prototype.toString.call(e).slice(8, -1)
      },
      objId: function (e) {
        return (
          e.__id ||
                        Object.defineProperty(e, '__id', {
                          value: ++t
                        }),
          e.__id
        )
      },
      clone: function e (n, t) {
        let r, i
        switch (((t = t || {}), a.util.type(n))) {
          case 'Object':
            if (((i = a.util.objId(n)), t[i])) return t[i]
            for (const l in ((r = {}), (t[i] = r), n)) {
              n.hasOwnProperty(l) && (r[l] = e(n[l], t))
            }
            return r
          case 'Array':
            return (
              (i = a.util.objId(n)),
              t[i]
                ? t[i]
                : ((r = []),
                  (t[i] = r),
                  n.forEach(function (n, a) {
                    r[a] = e(n, t)
                  }),
                  r)
            )
          default:
            return n
        }
      },
      getLanguage: function (e) {
        for (; e;) {
          const t = n.exec(e.className)
          if (t) return t[1].toLowerCase()
          e = e.parentElement
        }
        return 'none'
      },
      setLanguage: function (e, t) {
        ;(e.className = e.className.replace(RegExp(n, 'gi'), '')),
        e.classList.add('language-' + t)
      },
      currentScript: function () {
        if (typeof document === 'undefined') return null
        if ('currentScript' in document) {
          return document.currentScript
        }
        try {
          throw new Error()
        } catch (r) {
          const e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(
            r.stack
          ) || [])[1]
          if (e) {
            const n = document.getElementsByTagName('script')
            for (const t in n) if (n[t].src == e) return n[t]
          }
          return null
        }
      },
      isActive: function (e, n, t) {
        for (let r = 'no-' + n; e;) {
          const a = e.classList
          if (a.contains(n)) return !0
          if (a.contains(r)) return !1
          e = e.parentElement
        }
        return !!t
      }
    },
    languages: {
      plain: r,
      plaintext: r,
      text: r,
      txt: r,
      extend: function (e, n) {
        const t = a.util.clone(a.languages[e])
        for (const r in n) t[r] = n[r]
        return t
      },
      insertBefore: function (e, n, t, r) {
        const i = (r = r || a.languages)[e]
        const l = {}
        for (const o in i) {
          if (i.hasOwnProperty(o)) {
            if (o == n) {
              for (const s in t) {
                t.hasOwnProperty(s) && (l[s] = t[s])
              }
            }
            t.hasOwnProperty(o) || (l[o] = i[o])
          }
        }
        const u = r[e]
        return (
          (r[e] = l),
          a.languages.DFS(a.languages, function (n, t) {
            t === u && n != e && (this[n] = l)
          }),
          l
        )
      },
      DFS: function e (n, t, r, i) {
        i = i || {}
        const l = a.util.objId
        for (const o in n) {
          if (n.hasOwnProperty(o)) {
            t.call(n, o, n[o], r || o)
            const s = n[o]
            const u = a.util.type(s)
            u !== 'Object' || i[l(s)]
              ? u !== 'Array' ||
                              i[l(s)] ||
                              ((i[l(s)] = !0), e(s, t, o, i))
              : ((i[l(s)] = !0), e(s, t, null, i))
          }
        }
      }
    },
    plugins: {},
    highlightAll: function (e, n) {
      a.highlightAllUnder(document, e, n)
    },
    highlightAllUnder: function (e, n, t) {
      const r = {
        callback: t,
        container: e,
        selector:
                    'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      }
      a.hooks.run('before-highlightall', r),
      (r.elements = Array.prototype.slice.apply(
        r.container.querySelectorAll(r.selector)
      )),
      a.hooks.run('before-all-elements-highlight', r)
      for (var i, l = 0; (i = r.elements[l++]);) {
        a.highlightElement(i, !0 === n, r.callback)
      }
    },
    highlightElement: function (n, t, r) {
      const i = a.util.getLanguage(n)
      const l = a.languages[i]
      a.util.setLanguage(n, i)
      let o = n.parentElement
      o && o.nodeName.toLowerCase() === 'pre' && a.util.setLanguage(o, i)
      const s = {
        element: n,
        language: i,
        grammar: l,
        code: n.textContent
      }
      function u (e) {
        ;(s.highlightedCode = e),
        a.hooks.run('before-insert', s),
        (s.element.innerHTML = s.highlightedCode),
        a.hooks.run('after-highlight', s),
        a.hooks.run('complete', s),
        r && r.call(s.element)
      }
      if (
        (a.hooks.run('before-sanity-check', s),
        (o = s.element.parentElement) &&
                    o.nodeName.toLowerCase() === 'pre' &&
                    !o.hasAttribute('tabindex') &&
                    o.setAttribute('tabindex', '0'),
        !s.code)
      ) {
        return a.hooks.run('complete', s), void (r && r.call(s.element))
      }
      if ((a.hooks.run('before-highlight', s), s.grammar)) {
        if (t && e.Worker) {
          const c = new Worker(a.filename)
                    ;(c.onmessage = function (e) {
            u(e.data)
          }),
          c.postMessage(
            JSON.stringify({
              language: s.language,
              code: s.code,
              immediateClose: !0
            })
          )
        } else u(a.highlight(s.code, s.grammar, s.language))
      } else u(a.util.encode(s.code))
    },
    highlight: function (e, n, t) {
      const r = { code: e, grammar: n, language: t }
      if ((a.hooks.run('before-tokenize', r), !r.grammar)) {
        throw new Error(
          'The language "' + r.language + '" has no grammar.'
        )
      }
      return (
        (r.tokens = a.tokenize(r.code, r.grammar)),
        a.hooks.run('after-tokenize', r),
        i.stringify(a.util.encode(r.tokens), r.language)
      )
    },
    tokenize: function (e, n) {
      const t = n.rest
      if (t) {
        for (const r in t) n[r] = t[r]
        delete n.rest
      }
      const a = new s()
      return (
        u(a, a.head, e),
        o(e, a, n, a.head, 0),
        (function (e) {
          for (var n = [], t = e.head.next; t !== e.tail;) {
            n.push(t.value), (t = t.next)
          }
          return n
        })(a)
      )
    },
    hooks: {
      all: {},
      add: function (e, n) {
        const t = a.hooks.all
                ;(t[e] = t[e] || []), t[e].push(n)
      },
      run: function (e, n) {
        const t = a.hooks.all[e]
        if (t && t.length) {
          for (var r, i = 0; (r = t[i++]);) r(n)
        }
      }
    },
    Token: i
  }
  function i (e, n, t, r) {
    ;(this.type = e),
    (this.content = n),
    (this.alias = t),
    (this.length = 0 | (r || '').length)
  }
  function l (e, n, t, r) {
    e.lastIndex = n
    const a = e.exec(t)
    if (a && r && a[1]) {
      const i = a[1].length
            ;(a.index += i), (a[0] = a[0].slice(i))
    }
    return a
  }
  function o (e, n, t, r, s, g) {
    for (const f in t) {
      if (t.hasOwnProperty(f) && t[f]) {
        let h = t[f]
        h = Array.isArray(h) ? h : [h]
        for (let d = 0; d < h.length; ++d) {
          if (g && g.cause == f + ',' + d) return
          const v = h[d]
          const p = v.inside
          const m = !!v.lookbehind
          const y = !!v.greedy
          const k = v.alias
          if (y && !v.pattern.global) {
            const x = v.pattern.toString().match(/[imsuy]*$/)[0]
            v.pattern = RegExp(v.pattern.source, x + 'g')
          }
          for (
            let b = v.pattern || v, w = r.next, A = s;
            w !== n.tail && !(g && A >= g.reach);
            A += w.value.length, w = w.next
          ) {
            let E = w.value
            if (n.length > e.length) return
            if (!(E instanceof i)) {
              var P
              let L = 1
              if (y) {
                if (
                  !(P = l(b, A, e, m)) ||
                                    P.index >= e.length
                ) {
                  break
                }
                var S = P.index
                const O = P.index + P[0].length
                let j = A
                for (j += w.value.length; S >= j;) {
                  j += (w = w.next).value.length
                }
                if (
                  ((A = j -= w.value.length),
                  w.value instanceof i)
                ) {
                  continue
                }
                for (
                  let C = w;
                  C !== n.tail &&
                                    (j < O || typeof C.value === 'string');
                  C = C.next
                ) {
                  L++, (j += C.value.length)
                }
                L--, (E = e.slice(A, j)), (P.index -= A)
              } else if (!(P = l(b, 0, E, m))) continue
              S = P.index
              const N = P[0]
              const _ = E.slice(0, S)
              const M = E.slice(S + N.length)
              const W = A + E.length
              g && W > g.reach && (g.reach = W)
              let z = w.prev
              if (
                (_ && ((z = u(n, z, _)), (A += _.length)),
                c(n, z, L),
                (w = u(
                  n,
                  z,
                  new i(f, p ? a.tokenize(N, p) : N, k, N)
                )),
                M && u(n, w, M),
                L > 1)
              ) {
                const I = { cause: f + ',' + d, reach: W }
                o(e, n, t, w.prev, A, I),
                g &&
                                        I.reach > g.reach &&
                                        (g.reach = I.reach)
              }
            }
          }
        }
      }
    }
  }
  function s () {
    const e = { value: null, prev: null, next: null }
    const n = { value: null, prev: e, next: null }
        ;(e.next = n), (this.head = e), (this.tail = n), (this.length = 0)
  }
  function u (e, n, t) {
    const r = n.next
    const a = { value: t, prev: n, next: r }
    return (n.next = a), (r.prev = a), e.length++, a
  }
  function c (e, n, t) {
    for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next
    ;(n.next = r), (r.prev = n), (e.length -= a)
  }
  if (
    ((e.Prism = a),
    (i.stringify = function e (n, t) {
      if (typeof n === 'string') return n
      if (Array.isArray(n)) {
        let r = ''
        return (
          n.forEach(function (n) {
            r += e(n, t)
          }),
          r
        )
      }
      const i = {
        type: n.type,
        content: e(n.content, t),
        tag: 'span',
        classes: ['token', n.type],
        attributes: {},
        language: t
      }
      const l = n.alias
      l &&
                (Array.isArray(l)
                  ? Array.prototype.push.apply(i.classes, l)
                  : i.classes.push(l)),
      a.hooks.run('wrap', i)
      let o = ''
      for (const s in i.attributes) {
        o +=
                    ' ' +
                    s +
                    '="' +
                    (i.attributes[s] || '').replace(/"/g, '&quot;') +
                    '"'
      }
      return (
        '<' +
                i.tag +
                ' class="' +
                i.classes.join(' ') +
                '"' +
                o +
                '>' +
                i.content +
                '</' +
                i.tag +
                '>'
      )
    }),
    !e.document)
  ) {
    return e.addEventListener
      ? (a.disableWorkerMessageHandler ||
                  e.addEventListener(
                    'message',
                    function (n) {
                      const t = JSON.parse(n.data)
                      const r = t.language
                      const i = t.code
                      const l = t.immediateClose
                      e.postMessage(a.highlight(i, a.languages[r], r)),
                      l && e.close()
                    },
                    !1
                  ),
        a)
      : a
  }
  const g = a.util.currentScript()
  function f () {
    a.manual || a.highlightAll()
  }
  if (
    (g &&
            ((a.filename = g.src),
            g.hasAttribute('data-manual') && (a.manual = !0)),
    !a.manual)
  ) {
    const h = document.readyState
    h === 'loading' || (h === 'interactive' && g && g.defer)
      ? document.addEventListener('DOMContentLoaded', f)
      : window.requestAnimationFrame
        ? window.requestAnimationFrame(f)
        : window.setTimeout(f, 16)
  }
  return a
})(_self)
typeof module !== 'undefined' && module.exports && (module.exports = Prism),
typeof global !== 'undefined' && (global.Prism = Prism)
Prism.languages.clike = {
  comment: [
    {
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
      lookbehind: !0,
      greedy: !0
    },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  'class-name': {
    pattern:
            /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ }
  },
  keyword:
        /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  boolean: /\b(?:false|true)\b/,
  function: /\b\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
}
;(Prism.languages.go = Prism.languages.extend('clike', {
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
    lookbehind: !0,
    greedy: !0
  },
  keyword:
        /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  boolean: /\b(?:_|false|iota|nil|true)\b/,
  number: [
    /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
    /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
    /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
  ],
  operator:
        /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  builtin:
        /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
})),
Prism.languages.insertBefore('go', 'string', {
  char: { pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/, greedy: !0 }
}),
delete Prism.languages.go['class-name']
;(Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
  'string-interpolation': {
    pattern:
            /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern:
                    /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
        lookbehind: !0,
        inside: {
          'format-spec': {
            pattern: /(:)[^:(){}]+(?=\}$)/,
            lookbehind: !0
          },
          'conversion-option': {
            pattern: /![sra](?=[:}]$)/,
            alias: 'punctuation'
          },
          rest: null
        }
      },
      string: /[\s\S]+/
    }
  },
  'triple-quoted-string': {
    pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
    greedy: !0,
    alias: 'string'
  },
  string: {
    pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: !0
  },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0
  },
  'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
    lookbehind: !0,
    alias: ['annotation', 'punctuation'],
    inside: { punctuation: /\./ }
  },
  keyword:
        /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin:
        /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:False|None|True)\b/,
  number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
  operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/
}),
(Prism.languages.python[
  'string-interpolation'
].inside.interpolation.inside.rest = Prism.languages.python),
(Prism.languages.py = Prism.languages.python)
!(function () {
  if (typeof Prism !== 'undefined' && typeof document !== 'undefined') {
    const e = 'line-numbers'
    var n = /\n(?!$)/g
    const t = (Prism.plugins.lineNumbers = {
      getLine: function (n, t) {
        if (n.tagName === 'PRE' && n.classList.contains(e)) {
          const i = n.querySelector('.line-numbers-rows')
          if (i) {
            const r =
                            parseInt(n.getAttribute('data-start'), 10) || 1
            const s = r + (i.children.length - 1)
            t < r && (t = r), t > s && (t = s)
            const l = t - r
            return i.children[l]
          }
        }
      },
      resize: function (e) {
        r([e])
      },
      assumeViewportIndependence: !0
    })
    let i = void 0
    window.addEventListener('resize', function () {
      ;(t.assumeViewportIndependence && i === window.innerWidth) ||
                ((i = window.innerWidth),
                r(
                  Array.prototype.slice.call(
                    document.querySelectorAll('pre.line-numbers')
                  )
                ))
    }),
    Prism.hooks.add('complete', function (t) {
      if (t.code) {
        const i = t.element
        const s = i.parentNode
        if (
          s &&
                        /pre/i.test(s.nodeName) &&
                        !i.querySelector('.line-numbers-rows') &&
                        Prism.util.isActive(i, e)
        ) {
          i.classList.remove(e), s.classList.add(e)
          let l
          const o = t.code.match(n)
          const a = o ? o.length + 1 : 1
          const u = new Array(a + 1).join('<span></span>')
                        ;(l = document.createElement('span')).setAttribute(
            'aria-hidden',
            'true'
          ),
          (l.className = 'line-numbers-rows'),
          (l.innerHTML = u),
          s.hasAttribute('data-start') &&
                                (s.style.counterReset =
                                    'linenumber ' +
                                    (parseInt(
                                      s.getAttribute('data-start'),
                                      10
                                    ) -
                                        1)),
          t.element.appendChild(l),
          r([s]),
          Prism.hooks.run('line-numbers', t)
        }
      }
    }),
    Prism.hooks.add('line-numbers', function (e) {
      ;(e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0)
    })
  }
  function r (e) {
    if (
      (e = e.filter(function (e) {
        let n
        const t = ((n = e),
        n
          ? window.getComputedStyle
            ? getComputedStyle(n)
            : n.currentStyle || null
          : null)['white-space']
        return t === 'pre-wrap' || t === 'pre-line'
      })).length != 0
    ) {
      const t = e
        .map(function (e) {
          const t = e.querySelector('code')
          const i = e.querySelector('.line-numbers-rows')
          if (t && i) {
            let r = e.querySelector('.line-numbers-sizer')
            const s = t.textContent.split(n)
            r ||
                            (((r = document.createElement('span')).className =
                                'line-numbers-sizer'),
                            t.appendChild(r)),
            (r.innerHTML = '0'),
            (r.style.display = 'block')
            const l = r.getBoundingClientRect().height
            return (
              (r.innerHTML = ''),
              {
                element: e,
                lines: s,
                lineHeights: [],
                oneLinerHeight: l,
                sizer: r
              }
            )
          }
        })
        .filter(Boolean)
      t.forEach(function (e) {
        const n = e.sizer
        const t = e.lines
        const i = e.lineHeights
        const r = e.oneLinerHeight
                ;(i[t.length - 1] = void 0),
        t.forEach(function (e, t) {
          if (e && e.length > 1) {
            const s = n.appendChild(
              document.createElement('span')
            )
                            ;(s.style.display = 'block'), (s.textContent = e)
          } else i[t] = r
        })
      }),
      t.forEach(function (e) {
        for (
          let n = e.sizer, t = e.lineHeights, i = 0, r = 0;
          r < t.length;
          r++
        ) {
          void 0 === t[r] &&
                            (t[r] =
                                n.children[i++].getBoundingClientRect().height)
        }
      }),
      t.forEach(function (e) {
        const n = e.sizer
        const t = e.element.querySelector('.line-numbers-rows')
                    ;(n.style.display = 'none'),
        (n.innerHTML = ''),
        e.lineHeights.forEach(function (e, n) {
          t.children[n].style.height = e + 'px'
        })
      })
    }
  }
})()
!(function () {
  if (typeof Prism !== 'undefined' && typeof document !== 'undefined') {
    const e = { '(': ')', '[': ']', '{': '}' }
    const t = {
      '(': 'brace-round',
      '[': 'brace-square',
      '{': 'brace-curly'
    }
    const n = { '${': '{' }
    let r = 0
    var c = /^(pair-\d+-)(close|open)$/
    Prism.hooks.add('complete', function (c) {
      const i = c.element
      const d = i.parentElement
      if (d && d.tagName == 'PRE') {
        const u = []
        if (
          (Prism.util.isActive(i, 'match-braces') &&
                        u.push('(', '[', '{'),
          u.length != 0)
        ) {
          d.__listenerAdded ||
                        (d.addEventListener('mousedown', function () {
                          const e = d.querySelector('code')
                          const t = s('brace-selected')
                          Array.prototype.slice
                            .call(e.querySelectorAll('.' + t))
                            .forEach(function (e) {
                              e.classList.remove(t)
                            })
                        }),
                        Object.defineProperty(d, '__listenerAdded', {
                          value: !0
                        }))
          const f = Array.prototype.slice.call(
            i.querySelectorAll(
              'span.' + s('token') + '.' + s('punctuation')
            )
          )
          const h = []
          u.forEach(function (c) {
            for (
              var i = e[c], d = s(t[c]), u = [], p = [], v = 0;
              v < f.length;
              v++
            ) {
              const m = f[v]
              if (m.childElementCount == 0) {
                let b = m.textContent
                                ;(b = n[b] || b) === c
                  ? (h.push({
                      index: v,
                      open: !0,
                      element: m
                    }),
                    m.classList.add(d),
                    m.classList.add(s('brace-open')),
                    p.push(v))
                  : b === i &&
                                      (h.push({
                                        index: v,
                                        open: !1,
                                        element: m
                                      }),
                                      m.classList.add(d),
                                      m.classList.add(s('brace-close')),
                                      p.length && u.push([v, p.pop()]))
              }
            }
            u.forEach(function (e) {
              const t = 'pair-' + r++ + '-'
              const n = f[e[0]]
              const c = f[e[1]]
                            ;(n.id = t + 'open'),
              (c.id = t + 'close'),
              [n, c].forEach(function (e) {
                e.addEventListener('mouseenter', a),
                e.addEventListener('mouseleave', o),
                e.addEventListener('click', l)
              })
            })
          })
          let p = 0
          h.sort(function (e, t) {
            return e.index - t.index
          }),
          h.forEach(function (e) {
            e.open
              ? (e.element.classList.add(
                  s('brace-level-' + ((p % 12) + 1))
                ),
                p++)
              : ((p = Math.max(0, p - 1)),
                e.element.classList.add(
                  s('brace-level-' + ((p % 12) + 1))
                ))
          })
        }
      }
    })
  }
  function s (e) {
    const t = Prism.plugins.customClass
    return t ? t.apply(e, 'none') : e
  }
  function i (e) {
    const t = c.exec(e.id)
    return document.querySelector(
      '#' + t[1] + (t[2] == 'open' ? 'close' : 'open')
    )
  }
  function a () {
    Prism.util.isActive(this, 'brace-hover', !0) &&
            [this, i(this)].forEach(function (e) {
              e.classList.add(s('brace-hover'))
            })
  }
  function o () {
    ;[this, i(this)].forEach(function (e) {
      e.classList.remove(s('brace-hover'))
    })
  }
  function l () {
    Prism.util.isActive(this, 'brace-select', !0) &&
            [this, i(this)].forEach(function (e) {
              e.classList.add(s('brace-selected'))
            })
  }
})()
