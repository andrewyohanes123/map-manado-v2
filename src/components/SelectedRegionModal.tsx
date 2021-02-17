import { FC, ReactElement, useEffect, useContext, useCallback } from 'react'
import { Modal } from 'antd'
import { RegionSelector } from '../contexts/RegionSelectorContext'

export const SelectedRegionModal: FC = (): ReactElement => {
  const { region, unsetRegion } = useContext(RegionSelector);

  const closeModal = useCallback(() => {
    typeof unsetRegion !== 'undefined' && unsetRegion();
  }, [unsetRegion])

  return (
    <Modal mask={false} title={region?.name} maskClosable={false} onCancel={closeModal} footer={null} visible={typeof region !== 'undefined'}>

    </Modal>
  )
}
