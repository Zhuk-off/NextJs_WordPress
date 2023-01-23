import Container from './container'
import cn from 'classnames'
import { EXAMPLE_PATH } from '../lib/constants'

export default function Alert({ preview }) {
  return (
    <div
      className={cn('border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This is a page preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              Сайт не является действующим интернет магазином. Все товары вымышленные и представлены для образца. 
              {/* Исходный код можно найти здесь{' '}
              <a
                href={`https://github.com/Zhuk-off/NextJs_WordPress`}
                className="underline hover:text-brand-orange duration-200 transition-colors"
                target={'_blank'}
              >
                GitHub
              </a> */}
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
