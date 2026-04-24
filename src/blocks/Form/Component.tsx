'use client'

import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()

  const router = useRouter()

  const WHATSAPP_NUMBER = '254713366366' // 🔥 your number

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>

      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()
          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          // 🔥 WHATSAPP MESSAGE
          const message = Object.entries(data)
            .map(([key, value]) => `${key}: ${value}`)
            .join('%0A')

          const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

          window.open(whatsappURL, '_blank')

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <section className="w-full py-16 px-4 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT IMAGE */}
        <div className="relative w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden">
          <img src="/support.webp" alt="Contact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full">
          {enableIntro && introContent && !hasSubmitted && (
            <RichText className="mb-8" data={introContent} enableGutter={false} />
          )}

          <div className="p-6 border border-border rounded-2xl bg-background">
            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <RichText data={confirmationMessage} />
              )}

              {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}

              {error && (
                <div className="text-destructive">
                  {`${error.status || '500'}: ${error.message || ''}`}
                </div>
              )}

              {!hasSubmitted && (
                <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    {formFromProps?.fields?.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]

                      if (!Field) return null

                      return (
                        <div className="mb-6" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    })}
                  </div>

                  <Button type="submit" className="w-full rounded-full">
                    {submitButtonLabel}
                  </Button>
                </form>
              )}
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  )
}
