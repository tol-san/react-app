import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <img className={`icon ${className}`} src={`/assets/icons/${name.startsWith('inline-') ? name : `icon-${name}`}.svg`} alt="" aria-hidden="true" />
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const el = dialog.current
    el?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { el?.close(); document.body.style.overflow = previousOverflow }
  }, [])
  return <dialog className="modal" ref={dialog} aria-label={title} onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}><div className="modal-heading"><h2>{title}</h2><button aria-label="Close dialog" onClick={onClose}><Icon name="inline-02" /></button></div>{children}</dialog>
}

