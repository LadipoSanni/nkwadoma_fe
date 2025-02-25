import React from 'react'
import EmptyState from '@/reuseable/emptyStates/TableEmptyState';
import { FileText } from 'lucide-react';

function NotificationsEmptystate() {
  return (
    <div className='relative top-24 bottom-24'>
    <EmptyState
    name='Detail'
    icon={FileText}
    condition={true}
    notification={true}
    message='Click a notification to view its details'
    />
  </div>
  )
}

export default NotificationsEmptystate
